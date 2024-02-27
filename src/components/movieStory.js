import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../utils/constants";

const MovieStory = ({ movieName }) => {
  const [movieInfo, setMovieInfo] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Search the web and provide all available information regarding the movie ${movieName}. This should include details such as plot summary, main cast members, director, release date, genre, production company, filming locations, awards and nominations, critical reception, box office performance, trivia, cultural context, sequels, prequels, spin-offs, and adaptations. Ensure the information is accurate and up-to-date.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const sections = text.split("**");
        console.log(sections);
        const movieData = {
          title: sections[1].trim(),
          plotSummary: sections[4].trim(),
          mainCast: sections[6].trim().split("\n"),
          director: sections[8].trim(),
          releaseDate: sections[10].trim(),
          genre: sections[12].trim(),
          productionCompany: sections[14].trim(),
          filmingLocations: sections[15].trim(),
          awardsAndNominations: sections[18].trim(),
          criticalReception: sections[20].trim(),
          boxOfficePerformance: sections[22].trim(),
          trivia: sections[24].trim().split("\n"),
          culturalContext: sections[26].trim(),
          sequelsPrequelsSpinoffs: sections[28].trim(),
        };

        setMovieInfo(movieData);
      };

      if (movieName) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [movieName]);

  if (!movieInfo) return "Data is Unavailable";

  return (
    <div className="ml-24 w-[90%]">
      <h2>Title: {movieInfo.title}</h2>
      <div style={{ marginBottom: "20px" }}></div>
      <p>
        Plot Summary: <span className="w-[50%]">{movieInfo.plotSummary}</span>
      </p>
      <div style={{ marginBottom: "20px" }}></div>
      <h3>Main Cast Members:</h3>
      <ul>
        {movieInfo.mainCast.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Director: {movieInfo.director}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Release Date: {movieInfo.releaseDate}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Genre: {movieInfo.genre}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Production Company: {movieInfo.productionCompany}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Filming Locations: {movieInfo.filmingLocations}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Awards and Nominations: {movieInfo.awardsAndNominations}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Critical Reception: {movieInfo.criticalReception}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Box Office Performance: {movieInfo.boxOfficePerformance}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <h3>Trivia:</h3>
      <ul>
        {movieInfo.trivia.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
      <div style={{ marginBottom: "20px" }}></div>
      <p>Cultural Context: {movieInfo.culturalContext}</p>
      <div style={{ marginBottom: "20px" }}></div>
      <p>
        Sequels, Prequels, Spin-Offs, and Adaptations:{" "}
        {movieInfo.sequelsPrequelsSpinoffs}
      </p>
    </div>
  );
};

export default MovieStory;
