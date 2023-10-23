/*return (
  <div>
    <h1>Coin List</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Name</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>
        {coinData.map((coin) => (
          <tr key={coin.id}>
             
            <td>{coin.rank}</td>
            <td> 
          </td>
           <td>
            <Image src={coin.png32} roundedCircle />

              </td>
            <td>
              <a  target="_blank" rel="noopener noreferrer">
                {coin.name}
              </a>
            </td>
            <td>
              <a  target="_blank" rel="noopener noreferrer">
                {coin.rate}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);*/