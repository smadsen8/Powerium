//contains passport related info
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')


//Mongo Setup
const  ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://smadsen:smadsen@userinformation.mgssl.mongodb.net/UserInformation?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "UserInformation";


function initialize(passport, getUserByEmail,getUserById) {

    //function of authenticating users on login page. Done is a function that is called when we are done authenticating the user
    const authenticateUser = async (email,password,done) => {

        await client.connect();

        const db = client.db(dbName);
        const col = db.collection("user-info");

        const user = await col.findOne({email:email})
        await client.close();

        if(user == null) {
            return done(null,false, {message: 'No user found with that email'}) //false becuase no user found
        }

        try {
            if(await bcrypt.compare(password,user.password)) {
                return done(null, user)

            }

            else {
                return done(null,false, {message: 'Password incorrect, Try again'})
            }

        }
        catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    //serilaize user to store inside of the session
    passport.serializeUser((user,done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        await client.connect();

        const db = client.db(dbName);
        const col = db.collection("user-info");

         await col.findOne(
          {_id: new ObjectId(id)},
            (err, doc) => {
              if(err){
                return done(err);
              }
                return done(null, doc);
            }
        );
    });
}

module.exports = initialize
