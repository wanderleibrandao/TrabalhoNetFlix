import React, { useEffect, useState, useContext } from 'react'
import { StatusBar, Dimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'
import { ProfileContext } from '../context/ProfileContext';
import {useSpring, animated, config} from 'react-spring';
import { GetLocation, getLocation, filterByCountry } from '../services/MovieFilter'

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const AnimatedPoster = animated(Poster);

const Gradient = styled(LinearGradient)`
	height: 100%;
`

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [nationalMovies, setNationalMovies] = useState([]);
	const [moviesProfile, setMoviesProfile] = useState([]);
	const {user, setUser} = useContext(ProfileContext);
	const [labelProfile, setLabelProfile] = useState('');
	const [liberado, setLiberado] = useState(null);

	useEffect(() => {
		const label = () => {
			setLabelProfile(null);
			if (user != null) {
				setLabelProfile(`Continue assistindo como ${user}`);
				console.log("user: ", user);
				const fileJson = require('../assets/Movies.json');
				// console.log("Perfil escolhido: ", fileJson.object.user);
				// setMoviesProfile(fileJson.user);
				Object.keys(fileJson).forEach(function(key) {
					console.log(key);
					console.log(fileJson[key]);
					if (key == user) {
						setMoviesProfile(fileJson[key]);
						// break;
					}
				});
			}
		}
		label();
	},[user]);

	useEffect(() => {
		const loadingMovies = async () => {
			const fileJson = require('../assets/Movies.json');
			// console.log("Carregou json:", fileJson);
			// setAllMovies(fileJson);
			const position = await getLocation();
			// console.log("posição atual: ", position);
			var users = [];
			var nationalCountries;
			const keys = Object.keys(fileJson);
			console.log("Quantidade: ", keys.length);
			var count = 0;
			Object.keys(fileJson).forEach(async function(key) {
				// users.push(fileJson[key]);
				// const element = fileJson[key];teste
				// users.push(element.map((item, index) => {return item;})); teste
				const element = fileJson[key];
				nationalCountries = await filterByCountry(element, position);
				// console.log(key);
				// console.log(nationalCountries);
				setNationalMovies(nationalMovies => nationalMovies.concat(nationalCountries));
				// console.log("nacionais: ", nationalCountries);

				const nationalCountriesTitle = nationalCountries.map(
					(item, index) => item.Title,
				);

				moviesWithoutNationals = element.filter((item, index) => {
					return !nationalCountriesTitle.includes(item.Title)
				});
				setMovies(movies => movies.concat(moviesWithoutNationals));
				count++;
				if (keys.length == count) {
					console.log("libera");
					console.log("nacionais: ", nationalCountries);
					// console.log("internacionais: ", moviesWithoutNationals);
					setLiberado(true);
				}
			});
			console.log("foi embora");
			// setLiberado(true);
			// console.log("Users: ", users);
			
			
			// nationalCountries = await filterByCountry(item, position);
			// nationalCountries = await users.forEach((item) => {filterByCountry(item, position)}); teste
			// setNationalMovies(nationalCountries);

			// const nationalCountriesTitle = nationalCountries.map(
			// 	(item, index) => item.Title,
			// );

			// moviesWithoutNationals = movies.filter((item, index) => {
			// 	return !nationalCountriesTitle.includes(item.Title)
			// });
			// setMovies(moviesWithoutNationals);
		};
		loadingMovies();
	}, []);

	const PosterConfigs = useSpring({
		duration: 3000,
		to: {opacity: 0},
		from: {opacity: 1}
	})
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>
				<AnimatedPoster
				 source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ujQthWB6c0ojlARk28NSTmqidbF.jpg'}}>
					<Gradient
						locations={[0, 0.2, 0.6, 0.93]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
						<Header />
						<Hero /** onStackPressed={()=>{
							props.navigation.navigate('ChooseProfile');
						}}*/ />
					</Gradient>
				</AnimatedPoster>
				<Movies label='Recomendados' data={movies} />
				<Movies label='Top 10' data={nationalMovies} />
				{user ? <Movies label={labelProfile} data={moviesProfile} /> : <View />}
			</Container>
		</>
	)
}

export default Home
