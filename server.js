//FAZER: PUG, corrigir direito cada tipo de code.status que deve ter. Antes de tudo, checar só com a lógica de JSON.
import methodOverride from 'method-override';
import express from "express";
import routerCinema from "./src/routes/cinemaRouter.js";
import routerUser from "./src/routes/usersRouter.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import session from "express-session";
const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(session({
  secret: 'sua-chave-secreta-aqui', // Uma string qualquer para assinar o cookie
  resave: false,                  // Não salva a sessão se ela não for modificada
  saveUninitialized: false,       // Não cria sessão para quem não está logado
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 // Tempo de vida: 1 dia (em milissegundos)
  }
}));

app.use(methodOverride('_method'))

app.use("/api/cinema/", routerCinema);

app.use("/api/user/", routerUser);

app.use(errorMiddleware);

app.listen(porta, () => {
    console.log(`server running in ${porta}`);
})