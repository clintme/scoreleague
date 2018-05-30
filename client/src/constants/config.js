
const constants = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  env: process.env.REACT_APP_ENV || 'dev',
  maintenance: process.env.REACT_APP_MAINTENANCE || false,

  keywords: 'scoreleague',
  ogtitle: 'ScoreLeague',
  ogtype: 'website',
  ogdescription: '',
  ogsitename: 'ScoreLeague',
};

export default constants;
