Universities = new Mongo.Collection('universities');
USS = {};

Universities.allow({
    insert: function(userId, doc) {
        return !!userId;
    }
});

Courses = new SimpleSchema({
   name: {
       type: String,
       label: "Course name",
   },
   ranking: {
       type: Number,
       label: "College Ranking for this course",
       optional: true
   },
   Phd: {
       type: String,
       defaultValue: false,
       optional: true,
       allowedValues: ["True", "False"],
       autoform: {
           type: 'select-radio-inline'
       }
   }
});

USS.autoForm = {
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

UniversitySchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    location: {
        type: String,
        label: "Address"
    },
    state: {
        type: String,
        label: "State",
        autoform: {
            options: USS.autoForm
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
    coursesOffered: {
        type: [Courses],
    },
    deadLine: {
        type: Date,
        label: "Application Deadline"
    }

});

Universities.attachSchema( UniversitySchema );
