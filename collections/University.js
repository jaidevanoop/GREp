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
       autoform: {
           options: []
       }
   },
   ranking: {
       type: Number,
       label: "College Ranking for this course",
       optional: true
   },
   Phd: {
       type: Boolean,
       defaultValue: false,
       optional: true
   }
});

USS.autoForm = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
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
    }

});

Universities.attachSchema( UniversitySchema );