import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import FormDivider from "../../../../common/FormDivider";
import { useHistory } from "react-router-dom";

import lolRoles from "../../../../../mocks/mockLolRoles.json";
import dotaRoles from "../../../../../mocks/mockDotaRoles.json";
import valorantRoles from "../../../../../mocks/mockValorantRoles.json";

import lolRanks from "../../../../../mocks/mockLolRanks.json";
import dotaRanks from "../../../../../mocks/mockDotaRanks.json";
import valorantRanks from "../../../../../mocks/mockValorantRanks.json";

const gameToRoles = {
    "League of Legends": lolRoles,
    Dota2: dotaRoles,
    VALORANT: valorantRoles
};

const gameToRanks = {
    "League of Legends": lolRanks,
    Dota2: dotaRanks,
    VALORANT: valorantRanks
};

function GameProfiles() {
    const history = useHistory();
    const [selectedGame, setSelectedGame] = useState("League of Legends");

    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        bio: ""
    };

    const onSubmit = () => {
        // TODO: Post to backend
        history.push("/");
    };

    const onGameSelectChange = (event) => {
        setSelectedGame(event.target.value);
        console.log(selectedGame);
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .min(1, "Please enter your username")
            .required("Please enter your username"),
        role: yup
            .string()
            .min(1, "Please enter your first name")
            .required("Please enter your first name"),
        rank: yup
            .string()
            .min(1, "Please enter your last name")
            .required("Please enter your last name")
    });

    return (
        <>
            <Form.Label>Select Game:</Form.Label>
            <Form.Control
                as="select"
                custom
                name="gamechoice"
                onChange={(e) => onGameSelectChange(e)}
                value={selectedGame}
            >
                <option value="League of Legends">League of Legends</option>
                <option value="Dota2">Dota 2</option>
                <option value="VALORANT">VALORANT</option>
            </Form.Control>

            <FormDivider />

            <Formik {...{ initialValues, validationSchema, onSubmit }}>
                {({ handleSubmit, getFieldProps, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formLoginEmail">
                                <Form.Label>In-Game Username</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder=""
                                    {...getFieldProps("username")}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLoginEmail">
                                <Form.Label>Rank</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="gamerank"
                                >
                                    {selectedGame &&
                                        gameToRanks[selectedGame].map(
                                            (rank, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={rank}
                                                    >
                                                        {rank}
                                                    </option>
                                                );
                                            }
                                        )}
                                    {selectedGame &&
                                        gameToRanks[selectedGame].map(
                                            (rank) => {
                                                return rank;
                                            }
                                        )}
                                </Form.Control>

                                <Form.Control.Feedback type="invalid">
                                    {errors.rank}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formLoginEmail">
                            <Form.Label>Roles</Form.Label>
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "row wrap"
                                }}
                            >
                                {selectedGame &&
                                    gameToRoles[selectedGame].map((role, i) => (
                                        <div key={i} className="m-3">
                                            <Form.Check
                                                custom
                                                type="checkbox"
                                                id={`checkbox-${role}`}
                                                label={role}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </Form.Group>

                        <Button
                            variant="success"
                            type="submit"
                            block
                            style={{
                                display: "block",
                                margin: "0 auto"
                            }}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default GameProfiles;