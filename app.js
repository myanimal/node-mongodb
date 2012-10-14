var mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'test');

// Connect to server
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Connected, create user schema
    var userSchema = new mongoose.Schema({
        name: 'string'
    });
    // Add functionaliy to user schema
    userSchema.methods.speak = function() {
        var greeting = this.name
            ? "Hello, my name is " + this.name
            : "I don't have a name"
        console.log(greeting);
    };
    // Compile schema into a model
    var User = db.model('User', userSchema);

    // Create new user and save
    var names = ['Alex','Ted','Bob','Mary','Tod','Fred','Bill','Sarah','Ed'];
    var newUser = new User({ name: names[Math.floor(Math.random()*names.length)] });
    // Greet new user
    newUser.speak();
    newUser.save(function(error) {
        if (error)
            console.log('Failed to save user: ' + error);
        else
            console.log('User save: ' + newUser.name);
    });

    // Load all users and list them
    User.find(function(error, users) {
        if (error)
            console.log('Failed to find users: ' + error);
        else {
            console.log('Found %s users:', users.length);
            users.forEach(function(element, index, array) {
                console.log("\t%s", element.name);
            });
        }

        // Don't forget to clsoe the connection when we're don
        db.close();
    });
});