var locations=[
{
		title 			:'Anand',
		location 		:{
			lat 		: 22.5645,
			lng			: 72.9289
		},
		subset 			: [{
			title		:'Madhuban Resort',
			lat 		: 22.5393,
			lng 		: 72.9414
		},
		{
			title 		:'Shashtri Ground',
			lat 		:22.2953,
			lng 		:70.7997
		}]
},
{
		title 			:'Gandhidham',
		location 		:{
			lat 		: 23.0753,
			lng			: 70.1337
		},
		subset 			: [{
			title		:'Radisson Hotel Kandla',
			lat 		: 23.0856,
			lng 		: 70.1083
		},
		{
			title 		:'Hill Garden',
			lat 		: 23.2381,
			lng 		: 69.6422
		}]
},
{
		title 			:'Mumbai',
		location 		:{
			lat 		: 19.0760,
			lng			: 72.8777
		},
		subset 			: [{
			title		:'Hotel Taj',
			lat 		: 18.9217,
			lng 		: 72.8330
		},
		{
			title 		:'Adlabs Imagica',
			lat 		: 20.0000,
			lng 		: 76.0000,
		}]
},
{
		title 			:'Surat',
		location 		:{
			lat 		: 19.0760,
			lng			: 72.8777
		},
		subset 			: [{
			title		:'The Gateway Hotel',
			lat 		: 21.1773,
			lng 		: 72.7890
		},
		{
			title 		:'Dutch Garden',
			lat 		: 21.1773,
			lng 		: 72.8155,
		}]
},
{
		title 			:'Ahmedabad',
		location 		:{
			lat 		: 23.0225,
			lng			: 72.5714
		},
		subset 			: [{
			title		:'The Grand Bhagwati',
			lat 		: 23.0425,
			lng 		: 72.5145
		},
		{
			title 		:'Riverfront',
			lat 		: 23.0008,
			lng 		: 72.5716,
		}]
}
];
var ViewModel=function() {
	this.loc=ko.observableArray(locations);
	//var name='Radhika';
	var name=ko.observable('Radhika');
};

ko.applyBindings(new ViewModel());