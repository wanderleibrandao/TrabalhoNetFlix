import React, { useEffect } from 'react'

import { StatusBar, Dimensions } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import styled from 'styled-components/native'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'

import {useSpring, animated, config} from 'react-spring';
import { GetLocation } from '../services/MovieFilter'

const api = [
	require('../assets/movie1.jpg'),
	require('../assets/movie2.jpg'),
	require('../assets/movie3.jpg'),
	require('../assets/movie4.jpg')
]

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

const Home = (props) => {

	// useEffect(() => {
	// 	const loadingMovies = async () => {
	// 		const moviesJson = require('../assets/Movies.json');
	// 		const position = await getLocation();
	// 		const nationalCountries = await filterByCountry(moviesJson, position);
	// 		setNationalMovies(nationalCountries);

	// 		const nationalCountriesTitle = nationalCountries.map(
	// 			(item, index) => item.Title,
	// 		);

	// 		moviesWithoutNationals = moviesJson.filter((item, index) => {
	// 			return !nationalCountriesTitle.includes(item.Title)
	// 		});

	// 		setMovies(moviesWithoutNationals);
	// 	};
	// 	loadingMovies();
	// }, [movies]);

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
				 source={require('../assets/poster.jpg')}>
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
				<Movies label='Recomendados' item={api} />
				<Movies label='Top 10' item={api} />
			</Container>
		</>
	)
}

export default Home
