// required modules

const express = require("express");
const { graphql, buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const Champion = require("./champion");

// define the schema
// We define a Query type called language. It returns a String. 
// GraphQL is statically typed — fields have types, and if something doesn’t match up, and error is thrown.

const schema = buildSchema(`
	type Query {
		language: String
		getChampions: [Champion]
		getChampionByName(name: String!): Champion
	}

	type Champion {
		name: String
		attackDamage: Float
	}

	type Mutation {
		updateAttackDamage(name: String!, attackDamage: Float): Champion
	}
`);


//  Mock data and another endpoint added to rootValue

const champions = [
  new Champion('Ashe', 100),
  new Champion('Vayne', 200)
];


// Unlike REST APIs, Graph APIs have just one endpoint, which responds to all requests. 
// This is called a resolver.

const rootValue = {
	language: () => 'GraphQL',
	getChampions: () => champions,
	getChampionByName: ({name}) => {
		return champions.find(champion => champion.name === name)
	},
	updateAttackDamage: ({name, attackDamage}) => {
		const champion = champions.find(champion => champion.name === name)
		champion.attackDamage = attackDamage

		return champion
	}
};

// create an Express App and mount the resolver

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
	rootValue, schema, graphiql: true
}));

app.listen(4000, () => console.log('listening on 4000'));