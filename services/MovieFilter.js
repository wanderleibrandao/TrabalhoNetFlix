import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

export const getLocation = async () => {
    return new Promise((resolve, reject) => {
        const onReceiveLocation = (geolocation) => {
            resolve(geolocation);
        };

        Geolocation.getCurrentPosition(onReceiveLocation, (error) => {
            console.log(error);
            reject(); 
        });
    });
};

export const filterByCountry = async (movies, geolocation)  => {
    const location = await Geocoder.geocodePosition({
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude,
    });
    
    const national = movies.filter((item, index) => {
        return (isYourCountry =
            item.Country.indexOf(location[0].country) !== -1 ||
            item.Country.indexOf(location[0].countryCode) !== -1);
    });
    return national;
};

export const GetLocation = () => {
    Geolocation.getCurrentPosition(
        (info) => {
            console.log(info);
            const position = {lat: info.coords.latitude, lng: info.coords.longitude};
            Geocoder.geocodePosition(position).then(res => {
                 console.log(res);
            });
        },
        (error) => console.error(error),
    );
};