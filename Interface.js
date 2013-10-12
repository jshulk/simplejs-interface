var Interface = function( name, allowedMethods){
	if( arguments.length !=2 ){
		throw new Error("constructor expects exactly 2 arguments");
	}
	this.name = name;
	this.methods = [];

	for( var i = 0, len = allowedMethods.length; i < len; i++){
		if( typeof allowedMethods[i] != "string" ){
			throw new Error("method names should be of type string ");
		}

		this.methods.push( allowedMethods[i] );
	}
};

/*
* fn - function which is supposed to implement the interface.
*/
Interface.ensureImplements = function(fn, interfaceInstance ){
	if( arguments.length < 2){
		throw new Error("arguments cannot be less than 2")
	}

	if( interfaceInstance.constructor != Interface ){

		throw new Error("interface instance should be of type Interface ");
	}

	var interfaceMethods = interfaceInstance.methods;
	for( j = 0, len = interfaceMethods.length; j < len; j++ ){

		var method = interfaceMethods[j];
		if( !fn[ method ] && typeof fn[ method ] != "function" ){
			throw new Error("This class doesn't implement the " +interfaceInstance.name + "interface correctly, The method "+ method + " was not found");
		}
	}
};


Interface.extends = function( interfaceInstance ){
	
	if( interfaceInstance.constructor !== Interface ){
		throw new Error("Specified interface is not an instance of Interface Class");
	}

	return function( attrs ){
			_extend(this, attrs );

			Interface.ensureImplements( this, interfaceInstance );
	};

};

//Utility function for extending one object with another, could very
// well be replaced with underscore's _.extend.
var _extend = function( obj, extension ){
	for( var i in extension ){
		obj[i] = extension[i];
	};
} 