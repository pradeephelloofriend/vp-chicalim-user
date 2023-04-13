import { ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client';


const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

const link = createHttpLink({
	uri: `${process.env.GQL_API_PATH}`,
})

const client = new ApolloClient({
    link,
	cache,
	defaultOptions
  });

export default client;