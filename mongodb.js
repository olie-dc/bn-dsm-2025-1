// Exibe todos os bancos de dados já existentes
show dbs;

// Selecionando um banco de dados para trabalhar
// (se ainda não existir, será criado)
use estoque;

// Exibir as coleções do banco de dados
show collections;

// Primeira inserção
db.produtos.insertOne({
    nome: "Vassoura de piaçava",
    preco: 31.77,
    categoria: "Limpeza"
});

// Segunda inserção
db.produtos.insertOne({
  nome: "Café",
  marca: "Dubom",
  quantidade: 500,
  unidade: "g",
  preco: 30.87,
  categoria: "Alimentos e bebidas",
  estoque: 52
});

// Exibindo todos os produtos cadastrados
db.produtos.find();

// Terceira inserção
db.produtos.insertOne({
  nome_oficial: "República Francesa",
  nome_comum: "França",
  capital: "Paris",
  continente: "Europa",
  chefe_estado: "Emmanuel Macron",
  lingua_oficial: "francês"
});

// Exibindo apenas o produto cujo nome é igual a "Café"
// (case sensitive)
db.produtos.find({ nome: "Café" });

// Exibindo apenas o produto cujo nome é igual a "Café"
// (case INSENSITIVE, usando regex)
db.produtos.find({ nome: /^café$/i });

// Inserindo um produto com subdocumento
db.produtos.insertOne({
  nome: "Biscoito",
  marca: "Crocantão",
  quantidade: 200,
  unidade: "g",
  preco: 11.38,
  categoria: "Alimentos e bebidas",
  estoque: 100,
  fornecedor: {
    nome: "Indústria de Alimentos Bacana S/A",
    cnpj: "01.234.567/0001-89",
    email: "contato@bacana.ind.br",
    representante: "Belarmino Batista"
  }
});

// Inserindo outro produto, com dois subdocumentos
db.produtos.insertOne({
  nome: "Doce de leite",
  marca: "Goianim",
  preco: 19.64,
  fornecedor: {
    nome: "Indústria de Alimentos Bacana S/A",
    cnpj: "01.234.567/0001-89"
  },
  informacao_nutricional: {
    acucares_g: 75,
    gordura_saturada_g: 12,
    proteina_g: 13
  }
});

// Busca em subdocumentos
// Listando os produtos fornecidos pelo CNPJ "01.234.567/0001-89"
db.produtos.find({ "fornecedor.cnpj": "01.234.567/0001-89" });

// Produto com mais de um fornecedor (vetor de subdocumentos)
db.produtos.insertOne({
  nome: "Paçoca",
  marca: "Junina",
  preco: 26.70,
  fornecedor: [
    {
      nome: "Indústria de Alimentos Bacana S/A",
      cnpj: "01.234.567/0001-89"
    },
    {
      nome: "Distribuidora de Doces Pingo de Mel Ltda.",
      cnpj: "98.765.432/0001-10"
    }
  ]
});

// Listando os produtos por ordem alfabética de nome
// (1 = ordem ascendente)
db.produtos.find().sort({ nome: 1 });


// Listando os produtos por ordem alfabética de nome
// (-1 = ordem descendente)
db.produtos.find().sort({ nome: -1 });

// Inserção de produto com campo multivalorado
db.produtos.insertOne({
  nome: "Bicarbonato de sódio",
  marca: "Q-Rende",
  preco: 4.17,
  categoria: [
    "Alimentos e bebidas",
    "Limpeza"
  ],
  fornecedor: {
    nome: "Distribuidora de Doces Pingo de Mel Ltda.",
    cnpj: "98.765.432/0001-10"
  }
});

// Pesquisando os produtos da categoria "Limpeza"
db.produtos.find({ categoria: "Limpeza" });

// Pesquisando produtos que NÃO SÃO da categoria "Limpeza"
// $ne = not equal (não igual, diferente)
db.produtos.find({ categoria: { $ne: "Limpeza" } });

// Pesquisando produtos que NÃO TÊM o campo "categoria"
db.produtos.find({ categoria: { $exists: false } });

// Listando apenas os produtos cujo fornecedor têm o campo "email"
db.produtos.find({ "fornecedor.email": { $exists: true } });

// Fazendo a busca por dois campos ao mesmo tempo (operador AND)
db.produtos.find({ categoria: "Alimentos e bebidas", "fornecedor.cnpj": "01.234.567/0001-89"});

// Fazendo a busca por vários campos (operador OR)
db.produtos.find({
  $or: [
    { nome: "Paçoca" }, { nome: "Café" }
  ]
});

// Buscando apenas o produto de nome "Café" para copiar o seu _id
db.produtos.find({ nome: "Café" });

// Procurando um produto pelo seu _id e alterando o valor de campos já existentes
db.produtos.updateOne(
  { _id: ObjectId("67bcfc30509cf375fbf84471") },   // aqui cada um tem o seu
  {
    $set: {
      marca: "Torra Premium",
      preco: 46.92
    }
  }
);

// Atualizando um documento para inserir um campo que não existia antes
db.produtos.updateOne(
  { nome: "Paçoca" },
  {
    $set: {
      categoria: "Alimentos e bebidas"
    }
  }
);

//Exibindo o produto "Paçoca", apenas com os campos "nome", "preco" e "categoria"
db.produtos.find(
    {nome: "Paçoca"},
    {nome: true, preco: true, categoria: true}
);

//Repetindo a consulta anterior, trazendo os produtos "Paçoca" e "Café"

db.produtos.find(
    { $or: [
        {nome: "Paçoca"},
        {nome: "Café"}
    ]},
    {nome: true, preco: true, categoria: true}
);

//Selecionando o produto "Doce de leite"
db.produtos.find({nome: 'Doce de leite'});

//Aumentando o preço do Doce de leite em R$2,60
db.produtos.updateOne(
    {nome: 'Doce de leite'},
    {$inc: {preco: 2.60}}
);

//Selecionando o produto "Biscoito"
db.produtos.find({nome: "Biscoito"});

//$inc pode ser usado também para diminuir um valor
db.produtos.updateOne(
    {nome: "Biscoito"},
    {$inc: {estoque: -10}}
);

//Selecionando todos os produtos que tem preço
db.produtos.find({preco: {$exists: true}});

//Aumento em 10% o valor de todos os produtos que têm preço
//$mul ~> multiplica o valor do campo pela quantidade informada
db.produtos.updateMany(
    {preco: {$exists: true}},
    {$mul: {preco: 1.1}}
);

//Selecionando a "intrusa" Republica Francesa
db.produtos.find({nome_oficial: 'República Francesa'});

//Excluindo a República Francesa
db.produtos.deleteOne({nome_oficial: 'República Francesa'});

// Listando todos os produtos que custam mais de R$ 20,00
// Operadores de comparação:
// $lt: lesser than (menor que)
// $gt: greater than (maior que)
// $lte: lesser than or equal (menor ou igual)
// $gte: greater than or equal (maior ou igual)
// $ne: not equal (não igual, diferente)
// $eq: equal (igual)
db.produtos.find({preco: {$gt: 20}});

// Mesma consulta anterior, ordena por preco do manor para o maior
// (1 = ascendente)
db.produtos.find({preco: {$gt: 20}}).sort({preco: 1});

// Agora ordenando por preço, do maior para o menor
// (1 = descendente)
db.produtos.find({preco: {$gt: 20}}).sort({preco: -1});

// Ordenando por mais de um campo (note os [] no sort)
db.produtos.find({'fornecedor.cnpj' : {$exists: true}})
.sort([{'fornecedor.cnpj': 1}, {nome: 1}]);

//Excluindo todos os produtos cuja preço é menor ou igual a R$20,00
db.produtos.deleteMany({preco: {$lte: 20}});



