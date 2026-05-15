# Meu Projeto
  Como usar a API: comece por localhost:3000/api/cinema/all. De lá tem todos os caminhos que você pode seguir ao clicar. As rotas são:

  ## cinema: 
cinema = api/cinema
GET "cinema/all"

GET "cinema/novo"

GET "cinema/buscar"

GET "cinema/editar/:id"

POST "cinema/logmovie"

GET "cinema/get"

PUT "cinema/editar/:id"

DELETE "cinema/delete/:id"

  ## usuários: 
user = api/user

GET "user/login"

GET "user/logout"

GET "user/register"

POST "user/register"

POST "user/login"

GET "user/delete"

DELETE "user/delete"

Para postar, requer login ou cadastro. Você pode editar e excluir somente se você for o dono do log do filme. Todo mundo pode ver os logs de todo mundo, criando uma lista de filmes.
