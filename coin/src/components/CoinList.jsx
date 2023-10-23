import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const apiUrl = "https://api.livecoinwatch.com";
const apiKey = "c453e7c7-d0ee-43e1-acc1-c5cc8770463f";

function ListItem({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div style={{ align: "left" }} onClick={toggleFavorite}>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </div>
    </div>
  );
}

function Home() {
  const [coinData, setCoinData] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/coins/list`,
        {
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 50,
          meta: true,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );
      if (previousData.length > 0) {
        const updatedCoinData = response.data.map((coin, index) => {
          const previousDayDelta = (previousData[index].delta.day-1)*100;
          const currentDayDelta = (coin.delta.day - 1) * 100;

          if (currentDayDelta > previousDayDelta) {
            coin.delta.dayColor = "green";
          } else if (currentDayDelta < previousDayDelta) {
            coin.delta.dayColor = "red";
          } else {
            coin.delta.dayColor = "black"; 
          }

          return coin;
        });
        setCoinData(updatedCoinData);
      } else {
        setCoinData(response.data);
      }

      setPreviousData(response.data);
    } catch (error) {
      console.error("API isteği başarısız oldu", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell> Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h</TableCell>
              <TableCell align="right">7d</TableCell>
              <TableCell align="right">24h Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Weekly</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinData.map((coin) => (
              <TableRow
                key={coin.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <ListItem />
                  {coin.rank}
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                <Image  src={coin.png32} roundedCircle />
                  {coin.name}
                  </TableCell>
                <TableCell align="right">${coin.rate.toFixed(2)}</TableCell>
                <TableCell align="right" style={{ color: coin.delta.dayColor }}>
                  {coin.delta.day ===  "red"
                    ? `${((coin.delta.day - 1) * 100).toFixed(2)}%`
                    : coin.delta.dayColor === "green"
                    ? `${((coin.delta.day - 1) * 100).toFixed(2)}%`
                    : `${((coin.delta.day - 1) * 100).toFixed(2)}%`}
                </TableCell>

                <TableCell align="right">{coin.delta.week}</TableCell>
                <TableCell align="right">
                  {(() => {
                    if (coin.volume >= 1000000000) {
                      return `$${(coin.volume / 1000000000).toFixed(2)} B`;
                    } else if (coin.volume >= 1000000) {
                      return `$${(coin.volume / 1000000).toFixed(2)} M`;
                    } else if (coin.volume >= 1000) {
                      return `$${(coin.volume / 1000).toFixed(2)} K`;
                    } else {
                      return `$${coin.volume}`;
                    }
                  })()}
                </TableCell>
                <TableCell align="right">
                {(() => {
                    if (coin.volume >= 1000000000) {
                      return `$${(coin.cap / 1000000000).toFixed(2)} B`;
                    } else if (coin.cap >= 1000000) {
                      return `$${(coin.cap / 1000000).toFixed(2)} M`;
                    } else if (coin.cap >= 1000) {
                      return `$${(coin.cap / 1000).toFixed(2)} K`;
                    } else {
                      return `$${coin.cap}`;
                    }
                  })()}
                  
                  </TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
