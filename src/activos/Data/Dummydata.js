// Assets
import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image3 from "../image3.jpg";
import image4 from "../image4.jpg";
import image5 from "../image5.jpg";
import image6 from "../image6.jpg";
import image7 from "../image7.jpg";
import image8 from "../image8.jpg";
import image9 from "../image9.jpg";
import image10 from "../image10.jpg";
import image11 from "../image11.jpg";
import image12 from "../image12.jpg";
import image13 from "../image13.jpg";
import image14 from "../image14.jpg";
import image15 from "../image15.jpg";
import image16 from "../image16.jpg";

const myListings = [
	{
		id: 1,
		title: "Apartment for rent in Camden",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Camden",
		property_status: "Rent",
		price: 410000,
		rental_frequency: "Day",
		rooms: 4,
		furnished: false,
		pool: false,
		elevator: true,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.380873473514743, -77.91545576362341],
		},
		picture1: image3,
	},
	{
		id: 2,
		title: "House for sale in Islington",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Islington",
		property_status: "Sale",
		price: 35000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.38016539854702, -77.91361174486529],
		},
		picture1: image1,
	},
	{
		id: 3,
		title: "House for sale in Ealing",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Ealing",
		property_status: "Sale",
		price: 35000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: false,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [21.371725680538205, -77.91605255499213],
		},
		picture1: image5,
	},
	{
		id: 4,
		title: "Office for sale in Lambeth",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Lambeth",
		property_status: "Sale",
		price: 2000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [21.373263049248433, -77.91222236064999],
		},
		picture1: image4,
	},

	{
		id: 5,
		title: "House for sale in Enfield",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Enfield",
		property_status: "Sale",
		price: 5000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.37463680129971, -77.91974595689803],
		},
		picture1: image7,
	},

	{
		id: 6,
		title: "Apartment for rent in Barnet",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Barnet",
		property_status: "Rent",
		price: 150,
		rental_frequency: "Day",
		rooms: 4,
		furnished: false,
		pool: true,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [21.37136849911703, -77.91164434390696],
		},
		picture1: image12,
	},

	{
		id: 7,
		title: "Apartment for rent in Bexley",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bexley",
		property_status: "Rent",
		price: 3600,
		rental_frequency: "Month",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [21.3772131759504, -77.90319538606198],
		},
		picture1: image15,
	},

	{
		id: 8,
		title: "Office for rent in Croydon",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Croydon",
		property_status: "Rent",
		price: 750,
		rental_frequency: "Week",
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: true,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.372505823275194, -77.91584962425844],
		},
		picture1: image2,
	},

	{
		id: 9,
		title: "House for sale in Hounslow",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Hounslow",
		property_status: "Sale",
		price: 650000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.3743016985649, -77.91114502981065],
		},
		picture1: image8,
	},

	{
		id: 10,
		title: "Apartment for sale in Hackney",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Hackney",
		property_status: "Sale",
		price: 150000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.373797157253843, -77.90994340025048],
		},
		picture1: image16,
	},

	{
		id: 11,
		title: "House for rent in Bromley",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bromley",
		property_status: "Rent",
		price: 500,
		rental_frequency: "Day",
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.37434665763201, -77.90458434675611],
		},
		picture1: image10,
	},

	{
		id: 12,
		title: "Office for sale in Merton",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Merton",
		property_status: "Sale",
		price: 25000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.38212935930411, -77.91365021267238],
		},
		picture1: image14,
	},

	{
		id: 13,
		title: "House for sale in Havering",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Havering",
		property_status: "Sale",
		price: 1000000,
		rental_frequency: null,
		rooms: 4,
		furnished: false,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.3818508775862, -77.91734227341493],
		},
		picture1: image9,
	},

	{
		id: 14,
		title: "Apartment for rent in Wandsworth",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Wandsworth",
		property_status: "Rent",
		price: 2500,
		rental_frequency: "Week",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [21.378314238625432, -77.92512872552513],
		},
		picture1: image1,
	},

	{
		id: 15,
		title: "Office for rent in Redbridge",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Redbridge",
		property_status: "Rent",
		price: 5000,
		rental_frequency: "Month",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: true,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [21.370576294231046, -77.90907570512067],
		},
		picture1: image6,
	},
];

export default myListings;
