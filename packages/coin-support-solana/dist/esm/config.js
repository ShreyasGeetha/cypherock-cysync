import { getEnvVariable } from '@cypherock/cysync-utils';
export var config = {
    API_CYPHEROCK: getEnvVariable('API_CYPHEROCK', 'https://api.cypherock.com'),
};
