import "./WeigthJourney.css";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
const WeightJourney = () => {
  const [userWeight, setUserWeight] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/weighttracker/userinfo/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setUserWeight(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);
  console.log(userWeight);
  return (
    <Accordion className="accord" defaultActiveKey="0" flush>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="wj-title">
          <h2 className="wj-title">Weight Entries</h2>
        </Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>Weight</th>
                <th>Weight Goal</th>
              </tr>
            </thead>
            <tbody className="row-body">
              {userWeight.length > 0 &&
                userWeight.map((el) => {
                  return (
                    <tr>
                      <td>{el.current_weight} </td>
                      <td>{el.weight_goal}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default WeightJourney;
