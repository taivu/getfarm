// LOAD THIS GLOBALLY

/* eslint-disable */
window.AGF_CONFIG = {
  disableLogo: false,
  customLogo: {
    useCustomLogo: false,
    url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_116x41dp.png'
  },
  customIntro: {
    useCustomIntro: false,
    text: 'This is a custom intro. You are only allowed regular text in this space.'
  },

  // to filter by state
  byState: false,

  // must be string. can be lower/upper/mixed case.
  stateName: 'sC',

  // to filter by association
  byAssociation: false,

  // must be index from `associations` array. Example: this.associations[7]
  associationName: function () {
    return this.associations[16];
  }, 

  // associations array
  associations: [
    'AgCarolina Farm Credit, ACA',              // 0
    'AgChoice Farm Credit, ACA',                // 1
    'AgCredit, ACA',                            // 2
    'AgGeorgia Farm Credit, ACA',               // 3
    'AgSouth Farm Credit, ACA',                 // 4
    'ArborOne Farm Credit, ACA',                // 5
    'Cape Fear Farm Credit, ACA',               // 6
    'Carolina Farm Credit, ACA',                // 7
    'Central Kentucky ACA',                     // 8
    'Colonial Farm Credit',                     // 9
    'Farm Credit of Central Florida, ACA',      // 10
    'Farm Credit of Florida, ACA',              // 11
    'Farm Credit of Northwest Florida, ACA',    // 12
    'Farm Credit of the Virginias, ACA',        // 13
    'First South ACA',                          // 14
    'MidAtlantic Farm Credit, ACA',             // 15
    'River Valley AgCredit',                    // 16
    'Southwest Georgia Farm Credit, ACA',       // 17
    'Yankee Farm Credit ACA'                    // 18
  ]
};
/* eslint-enable */
