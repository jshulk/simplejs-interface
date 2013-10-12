/*
* Constructor that creates an interface object which is then used to 
* to see if an object implements the specified methods.
* @param objectName | String | The instance name of the interface.
* @param methods | Array | methods that should be implemented by the relevant function.
*/
var Interface = function( objectName, methods ){
	if( arguments.length != 2)
		throw new Error("Interface constructor called with " + arguments.length +" arguments, but expected exactly 2.");
	
	// Create the public properties
	this.name = objectName;
	this.methods = [];

	// Loop through provided arguments and add them to the 'methods' array.
	for( var i = 0, len = methods.length; i < len; i++){
		// check that method name is a string
		if( typeof methods[i] !== "string"){
			throw new Error("Interface constructor expects method names to be passed in as string ");
		}

		// If all is as required then add the provided method name to the methods array.
		this.methods.push( methods[i] );

	}

};

/*
* Add a static method to the interface constructor
* @param Object | object literal | an object literal containing methods
* that should be implemented.
*/
Interface.ensureImplements = function( object ){
	// check that right amount of arguments are provided.
	if( arguments.length < 2){
		throw new Error("Interface.ensureImplements was called with " + arguments.length + " arguments, but expected atleast 2");
	}

	//Loop through provided arguments, notice loop starts at 1
	for( var i = 1, len = arguments.length; i < len; i++){
		// check the object provided as an argument is an instance of 
		// the interface class.
		var interface = arguments[i];
		if( interface.constructor !== Interface ){
			throw new Error("Interface.ensureImplements the second argument to be an instance of the Interface constructor ");
		}

		//If provided argument is an instance of Interface class.
		// loop through provided arguments and check they implement required methods.

		for( var j = 0, len = interface.methods.length; j < len; j++ ){
			var method = interface.methods[j];
			// check the method name exists and that it is a function.
			if( !object[method] || typeof object[method] !== "function"){
				throw new Error("This class doesn't implement the " +interface.name + "interface correctly, The method "+ method + " was not found");
			}
		}
	}
};

var _extend = function( obj, extension ){
	for( var i in extension ){
		obj[i] = extension[i];
	};
} 

Interface.extends = function( interfaceInstance, properties ){
	
	if( interfaceInstance.constructor !== Interface ){
		throw new Error("Specified interface is not an instance of Interface Class");
	}

	return function(){
			_extend(this, properties );

			Interface.ensureImplements( this, interfaceInstance );
	};

};
