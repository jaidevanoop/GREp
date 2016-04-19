Universities = new Mongo.Collection('universities');

UniIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { name: 1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Universities,
  fields: ['name'],
  defaultSearchOptions: {
    limit: 8
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});


opt = {};

opt.phd = {
    "Yes": "True",
    "No": "False"
}

opt.country = {
	"AF"  :  "Afghanistan" ,
	"AL"  :  "Albania" ,
	"DZ"  :  "Algeria" ,
	"AS"  :  "American Samoa" ,
	"AD"  :  "Andorra" ,
	"AO"  :  "Angola" ,
	"AI"  :  "Anguilla" ,
	"AQ"  :  "Antarctica" ,
	"AG"  :  "Antigua and Barbuda" ,
	"AR"  :  "Argentina" ,
	"AM"  :  "Armenia" ,
	"AW"  :  "Aruba" ,
	"AU"  :  "Australia" ,
	"AT"  :  "Austria" ,
	"AZ"  :  "Azerbaijan" ,
	"BS"  :  "Bahamas" ,
	"BH"  :  "Bahrain" ,
	"BD"  :  "Bangladesh" ,
	"BB"  :  "Barbados" ,
	"BY"  :  "Belarus" ,
	"BE"  :  "Belgium" ,
	"BZ"  :  "Belize" ,
	"BJ"  :  "Benin" ,
	"BM"  :  "Bermuda" ,
	"BT"  :  "Bhutan" ,
	"BO"  :  "Bolivia" ,
	"BA"  :  "Bosnia and Herzegowina" ,
	"BW"  :  "Botswana" ,
	"BV"  :  "Bouvet Island" ,
	"BR"  :  "Brazil" ,
	"IO"  :  "British Indian Ocean Territory" ,
	"BN"  :  "Brunei Darussalam" ,
	"BG"  :  "Bulgaria" ,
	"BF"  :  "Burkina Faso" ,
	"BI"  :  "Burundi" ,
	"KH"  :  "Cambodia" ,
	"CM"  :  "Cameroon" ,
	"CA"  :  "Canada" ,
	"CV"  :  "Cape Verde" ,
	"KY"  :  "Cayman Islands" ,
	"CF"  :  "Central African Republic" ,
	"TD"  :  "Chad" ,
	"CL"  :  "Chile" ,
	"CN"  :  "China" ,
	"CX"  :  "Christmas Island" ,
	"CC"  :  "Cocos (Keeling) Islands" ,
	"CO"  :  "Colombia" ,
	"KM"  :  "Comoros" ,
	"CG"  :  "Congo" ,
	"CD"  :  "Congo" ,
	"CK"  :  "Cook Islands" ,
	"CR"  :  "Costa Rica" ,
	"CI"  :  "Cote d'Ivoire" ,
	"HR"  :  "Croatia (Hrvatska)" ,
	"CU"  :  "Cuba" ,
	"CY"  :  "Cyprus" ,
	"CZ"  :  "Czech Republic" ,
	"DK"  :  "Denmark" ,
	"DJ"  :  "Djibouti" ,
	"DM"  :  "Dominica" ,
	"DO"  :  "Dominican Republic" ,
	"TP"  :  "East Timor" ,
	"EC"  :  "Ecuador" ,
	"EG"  :  "Egypt" ,
	"SV"  :  "El Salvador" ,
	"GQ"  :  "Equatorial Guinea" ,
	"ER"  :  "Eritrea" ,
	"EE"  :  "Estonia" ,
	"ET"  :  "Ethiopia" ,
	"FK"  :  "Falkland Islands (Malvinas)" ,
	"FO"  :  "Faroe Islands" ,
	"FJ"  :  "Fiji" ,
	"FI"  :  "Finland" ,
	"FR"  :  "France" ,
	"FX"  :  "France, Metropolitan" ,
	"GF"  :  "French Guiana" ,
	"PF"  :  "French Polynesia" ,
	"TF"  :  "French Southern Territories" ,
	"GA"  :  "Gabon" ,
	"GM"  :  "Gambia" ,
	"GE"  :  "Georgia" ,
	"DE"  :  "Germany" ,
	"GH"  :  "Ghana" ,
	"GI"  :  "Gibraltar" ,
	"GR"  :  "Greece" ,
	"GL"  :  "Greenland" ,
	"GD"  :  "Grenada" ,
	"GP"  :  "Guadeloupe" ,
	"GU"  :  "Guam" ,
	"GT"  :  "Guatemala" ,
	"GN"  :  "Guinea" ,
	"GW"  :  "Guinea-Bissau" ,
	"GY"  :  "Guyana" ,
	"HT"  :  "Haiti" ,
	"HM"  :  "Heard and Mc Donald Islands" ,
	"VA"  :  "Holy See (Vatican City State)" ,
	"HN"  :  "Honduras" ,
	"HK"  :  "Hong Kong" ,
	"HU"  :  "Hungary" ,
	"IS"  :  "Iceland" ,
	"IN"  :  "India" ,
	"ID"  :  "Indonesia" ,
	"IR"  :  "Iran" ,
	"IQ"  :  "Iraq" ,
	"IE"  :  "Ireland" ,
	"IL"  :  "Israel" ,
	"IT"  :  "Italy" ,
	"JM"  :  "Jamaica" ,
	"JP"  :  "Japan" ,
	"JO"  :  "Jordan" ,
	"KZ"  :  "Kazakhstan" ,
	"KE"  :  "Kenya" ,
	"KI"  :  "Kiribati" ,
	"KP"  :  "South Korea" ,
	"KR"  :  "North Korea" ,
	"KW"  :  "Kuwait" ,
	"KG"  :  "Kyrgyzstan" ,
	"LA"  :  "Lao People's Democratic Republic" ,
	"LV"  :  "Latvia" ,
	"LB"  :  "Lebanon" ,
	"LS"  :  "Lesotho" ,
	"LR"  :  "Liberia" ,
	"LY"  :  "Libyan Arab Jamahiriya" ,
	"LI"  :  "Liechtenstein" ,
	"LT"  :  "Lithuania" ,
	"LU"  :  "Luxembourg" ,
	"MO"  :  "Macau" ,
	"MK"  :  "Macedonia" ,
	"MG"  :  "Madagascar" ,
	"MW"  :  "Malawi" ,
	"MY"  :  "Malaysia" ,
	"MV"  :  "Maldives" ,
	"ML"  :  "Mali" ,
	"MT"  :  "Malta" ,
	"MH"  :  "Marshall Islands" ,
	"MQ"  :  "Martinique" ,
	"MR"  :  "Mauritania" ,
	"MU"  :  "Mauritius" ,
	"YT"  :  "Mayotte" ,
	"MX"  :  "Mexico" ,
	"FM"  :  "Micronesia" ,
	"MD"  :  "Moldova" ,
	"MC"  :  "Monaco" ,
	"MN"  :  "Mongolia" ,
	"MS"  :  "Montserrat" ,
	"MA"  :  "Morocco" ,
	"MZ"  :  "Mozambique" ,
	"MM"  :  "Myanmar" ,
	"NA"  :  "Namibia" ,
	"NR"  :  "Nauru" ,
	"NP"  :  "Nepal" ,
	"NL"  :  "Netherlands" ,
	"AN"  :  "Netherlands Antilles" ,
	"NC"  :  "New Caledonia" ,
	"NZ"  :  "New Zealand" ,
	"NI"  :  "Nicaragua" ,
	"NE"  :  "Niger" ,
	"NG"  :  "Nigeria" ,
	"NU"  :  "Niue" ,
	"NF"  :  "Norfolk Island" ,
	"MP"  :  "Northern Mariana Islands" ,
	"NO"  :  "Norway" ,
	"OM"  :  "Oman" ,
	"PK"  :  "Pakistan" ,
	"PW"  :  "Palau" ,
	"PA"  :  "Panama" ,
	"PG"  :  "Papua New Guinea" ,
	"PY"  :  "Paraguay" ,
	"PE"  :  "Peru" ,
	"PH"  :  "Philippines" ,
	"PN"  :  "Pitcairn" ,
	"PL"  :  "Poland" ,
	"PT"  :  "Portugal" ,
	"PR"  :  "Puerto Rico" ,
	"QA"  :  "Qatar" ,
	"RE"  :  "Reunion" ,
	"RO"  :  "Romania" ,
	"RU"  :  "Russian Federation" ,
	"RW"  :  "Rwanda" ,
	"KN"  :  "Saint Kitts and Nevis" ,
	"LC"  :  "Saint LUCIA" ,
	"VC"  :  "Saint Vincent and the Grenadines" ,
	"WS"  :  "Samoa" ,
	"SM"  :  "San Marino" ,
	"ST"  :  "Sao Tome and Principe" ,
	"SA"  :  "Saudi Arabia" ,
	"SN"  :  "Senegal" ,
	"SC"  :  "Seychelles" ,
	"SL"  :  "Sierra Leone" ,
	"SG"  :  "Singapore" ,
	"SK"  :  "Slovakia (Slovak Republic)" ,
	"SI"  :  "Slovenia" ,
	"SB"  :  "Solomon Islands" ,
	"SO"  :  "Somalia" ,
	"ZA"  :  "South Africa" ,
	"GS"  :  "South Georgia and the South Sandwich Islands" ,
	"ES"  :  "Spain" ,
	"LK"  :  "Sri Lanka" ,
	"SH"  :  "St. Helena" ,
	"PM"  :  "St. Pierre and Miquelon" ,
	"SD"  :  "Sudan" ,
	"SR"  :  "Suriname" ,
	"SJ"  :  "Svalbard and Jan Mayen Islands" ,
	"SZ"  :  "Swaziland" ,
	"SE"  :  "Sweden" ,
	"CH"  :  "Switzerland" ,
	"SY"  :  "Syrian Arab Republic" ,
	"TW"  :  "Taiwan" ,
	"TJ"  :  "Tajikistan" ,
	"TZ"  :  "Tanzania" ,
	"TH"  :  "Thailand" ,
	"TG"  :  "Togo" ,
	"TK"  :  "Tokelau" ,
	"TO"  :  "Tonga" ,
	"TT"  :  "Trinidad and Tobago" ,
	"TN"  :  "Tunisia" ,
	"TR"  :  "Turkey" ,
	"TM"  :  "Turkmenistan" ,
	"TC"  :  "Turks and Caicos Islands" ,
	"TV"  :  "Tuvalu" ,
	"UG"  :  "Uganda" ,
	"UA"  :  "Ukraine" ,
	"AE"  :  "United Arab Emirates" ,
	"GB"  :  "United Kingdom" ,
	"US"  :  "United States" ,
	"UM"  :  "United States Minor Outlying Islands" ,
	"UY"  :  "Uruguay" ,
	"UZ"  :  "Uzbekistan" ,
	"VU"  :  "Vanuatu" ,
	"VE"  :  "Venezuela" ,
	"VN"  :  "Viet Nam" ,
	"VG"  :  "Virgin Islands (British)" ,
	"VI"  :  "Virgin Islands (U.S.)" ,
	"WF"  :  "Wallis and Futuna Islands" ,
	"EH"  :  "Western Sahara" ,
	"YE"  :  "Yemen" ,
	"YU"  :  "Yugoslavia" ,
	"ZM"  :  "Zambia" ,
	"ZW"  :  "Zimbabwe"
};

opt.states = {
	 "Alabama"               :  "AL"   ,
     "Alaska"				 :	"AK"   ,
     "Arizona"				 :	"AZ"   ,
     "Arkansas"				 :	"AR"   ,
     "California"			 :	"CA"   ,
     "Colorado"				 :	"CO"   ,
     "Connecticut"			 :	"CT"   ,
     "Delaware"				 :	"DE"   ,
     "District of Columbia"	 :	"DC"   ,
     "Florida"				 :	"FL"   ,
     "Georgia"				 :	"GA"   ,
     "Hawaii"				 :	"HI"   ,
     "Idaho"				 :	"ID"   ,
     "Illinois"				 :	"IL"   ,
     "Indiana"				 :	"IN"   ,
     "Iowa"					 :	"IA"   ,
     "Kansas"				 :	"KS"   ,
     "Kentucky"				 :	"KY"   ,
     "Louisiana"			 :	"LA"   ,
     "Maine"				 :	"ME"   ,
     "Montana"				 :	"MT"   ,
     "Nebraska"				 :	"NE"   ,
     "Nevada"				 :	"NV"   ,
     "New Hampshire"		 :	"NH"   ,
     "New Jersey"			 :	"NJ"   ,
     "New Mexico"			 :	"NM"   ,
     "New York"				 :	"NY"   ,
     "North Carolina"		 :	"NC"   ,
     "North Dakota"			 :	"ND"   ,
     "Ohio"					 :	"OH"   ,
     "Oklahoma"				 :	"OK"   ,
     "Oregon"				 :	"OR"   ,
     "Maryland"				 :	"MD"   ,
     "Massachusetts"		 :	"MA"   ,
     "Michigan"				 :	"MI"   ,
     "Minnesota"			 :	"MN"   ,
     "Mississippi"			 :	"MS"   ,
     "Missouri"				 :	"MO"   ,
     "Pennsylvania"			 :	"PA"   ,
     "Rhode Island"			 :	"RI"   ,
     "South Carolina"		 :	"SC"   ,
     "South Dakota"			 :	"SD"   ,
     "Tennessee"			 :	"TN"   ,
     "Texas"				 :	"TX"   ,
     "Utah"					 :	"UT"   ,
     "Vermont"				 :	"VT"   ,
     "Virginia"				 :	"VA"   ,
     "Washington"			 :	"WA"   ,
     "West Virginia"		 :	"WV"   ,
     "Wisconsin"			 :	"WI"   ,
     "Wyoming"				 :  "WY"
};

AdminConfig = {
  adminEmails: ['viditvineet@hotmail.com','jai1396@gmail.com','jaidev.anoop@gmail.com'],
  collections:
  {
      Universities: {}
  },
  skin: 'black'
}

Universities.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Courses = new SimpleSchema({
   name: {
       type: String,
       label: "Course name",
   },
   Phd: {
       type: String,
       autoform: {
           options: opt.phd
       }
   }
});

Departments = new SimpleSchema({
	num: {
		type: Number,
		label: "Index of department",
		optional: false
	},
   name: {
       type: String,
       label: "Department name",
   },
   ranking: {
       type: Number,
       label: "Department Rank in the world",
       optional: true
   },
   greCutoff: {
	   type: Number,
	   label: "Cut-off for GRE",
	   optional: true
   },
   coursesOffered: {
	   type: [Courses],
	   optional: true

   },
});



UniversitySchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    location: {
        type: String,
        label: "Address",
        autoform: {
        	rows:5
    	}
    },
    country: {
        type: String,
        label: "Country",
        autoform: {
            options: opt.country
        }
    },
    website: {
        type: String,
        label: "Website"
    },
	greCutoff: {
		type: Number,
		label: "Cut-off for GRE",
		optional: true
	},
	toeflCutoff: {
		type: Number,
		label: "Cut-off for TOEFL",
		optional: true
	},
	ranking: {
		type: Number,
		label: "Rank of university in the world",
		optional: true
	},
    dept: {
        type: [Departments],
        optional: true

    },
    deadLine: {
        type: Date,
        label: "Application Deadline"
    },
    imageLink: {
        type: String,
        label: "Image Source",
        optional: true
    },
    bookmark: {
        type: [String],
        optional: true,
        autoform: {
             omit: true
           }
    },
    like: {
        type: [String],
        optional: true,
        autoform: {
             omit: true
           }
    },
    latitude: {
        type: Number,
        decimal: true,
        label: "Latitude",
        optional: false
    },
    longitude: {
        type: Number,
        decimal: true,
        label: "Longitude",
        optional: false
    }
});

Universities.attachSchema( UniversitySchema );
