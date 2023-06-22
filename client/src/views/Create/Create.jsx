import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { validateCreate } from "../../utils/validators";
import { createPokemon } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";

const Create = () => {
  const [loading, setLoading] = useState(true);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    pokemons.length ? setLoading(false) : setLoading(true);
  }, [pokemons]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Form
        formName="POKEMON CREATOR"
        fields={{
          name: {
            name: "Name",
            type: "text",
            value: "",
          },
          img: {
            name: "Img",
            type: "text",
            value: "",
          },
          hp: {
            name: "Health points",
            type: "number",
            value: "",
          },
          atk: {
            name: "Attack",
            type: "number",
            value: "",
          },
          def: {
            name: "Defense",
            type: "number",
            value: "",
          },
          spatk: {
            name: "Special Attack",
            type: "number",
            value: "",
          },
          spdef: {
            name: "Special Defense",
            type: "number",
            value: "",
          },
          speed: {
            name: "Speed",
            type: "number",
            value: "",
          },
          weight: {
            name: "Weight",
            type: "number",
            value: "",
          },
          height: {
            name: "Height",
            type: "number",
            value: "",
          },
          type: {
            name: "Type",
            type: "text",
            value: "",
          },
          subType: {
            name: "Sub Type",
            type: "text",
            value: "",
          },
        }}
        button={{
          value: "Create new Pokemon",
          type: "submit",
        }}
        action={createPokemon}
        validator={validateCreate}
        pokemons={pokemons}
      />
    </>
  );
};

export default Create;
