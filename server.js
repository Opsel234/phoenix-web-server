const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Phoenix Web Online</h1><p>Estado: Esperando señal de la App.</p>');
});

app.get('/activate', (req, res) => {
  res.json({
    status: "success",
    action: "trigger_adb",
    payload: "sh /data/data/com.phoenix/activate.sh"
  });
});

app.listen(port, () => {
  console.log('Servidor Phoenix listo');
});
