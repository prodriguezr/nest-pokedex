export const EnvConfiguration = () => ({
	environment: process.env.NODE_ENV || 'dev',
	mongodb: process.env.MONGODB_URI || '',
	port: +process.env.PORT,
	defaultLimit: +process.env.DEFAULT_LIMIT,
	defaultSeed: +process.env.DEFAULT_SEED_LIMIT,
});
