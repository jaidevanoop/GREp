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
    "T": "True",
    "F": "False"
}

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
  }
}

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
       autoform: {
           options: opt.phd
       }
   }
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
    state: {
        type: String,
        label: "State",
        autoform: {
            options: opt.states
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
        optional: true //Temporary
    },
    deadLine: {
        type: Date,
        label: "Application Deadline"
    }

});

Universities.attachSchema( UniversitySchema );
