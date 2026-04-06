const express = require('express');
const app = express();
const port = process.env.PORT ||3000;

// Estado del chispazo
let adbTriggered = false;

// Para poder recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

// PÁGINA PRINCIPAL (pc)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Phoenix Web Control</title>
        <style>
          body { background: #0D0D0D; color: #00F3FF; font-family: 'Courier New', monospace; text-align: center; padding-top: 100px; }
          h1 { font-size: 3em; text-shadow: 0 0 20px #00F3FF; }
          button { 
            background: #39FF14; color: black; border: none; padding: 30px 60px; 
            font-size: 24px; font-weight: bold; border-radius: 50px; cursor: pointer;
            box-shadow: 0 0 30px #39FF14; transition: 0.3s;
          }
          button:hover { transform: scale(1.1); box-shadow: 0 0 50px #39FF14; }
          button:active { background: #00F3FF; box-shadow: 0 0 50px #00F3FF; }
          .status { margin-top: 40px; color: #555; }
        </style>
      </head>
      <body>
        <h1>ADB PHOENIX</h1>
        <p>Pulsa el botón para enviar el chispazo a tu móvil</p>
        <br>
        <form action="/spark" method="POST">
          <button type="submit">LANZAR CHISPAZO</button>
        </form>
        <div class="status">
          Estado del Servidor: ${adbTriggered ? '🔥 CHISPAZO EN COLA' : '📡 ESPERANDO USUARIO'}
        </div>
      </body>
    </html>
  `);
});

// RUTA PARA EL BOTÓN
app.post('/spark', (req, res) => {
  adbTriggered = true;
  console.log("¡Chispazo activado desde la web!");
  res.redirect('/'); // Regresa a la página principal
});

// RUTA PARA LA APP:
app.get('/activate', (req, res) => {
  if (adbTriggered) {
    adbTriggered = false;
    res.json({
      status: "success",
      action: "trigger_adb",
      payload: "sh /data/data/com.app.adbphoenix/activate.sh" 
      // de berdad me pregunto si leen el codigo
    });
  } else {
    res.json({ status: "waiting", message: "No hay chispazos pendientes" });
  }
});

app.listen(port, () => {
  console.log('Servidor Phoenix listo en puerto ' + port);
});
