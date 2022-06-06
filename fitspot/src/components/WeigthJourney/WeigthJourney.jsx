import "./WeigthJourney.css";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Offcanvas from "react-bootstrap/Offcanvas";

const WeightJourney = () => {
  const [userWeight, setUserWeight] = useState([]);
  const [user, token] = useAuth();

  // offcanavs
  const options = [
    {
      name: "Disable backdrop",
      scroll: false,
      backdrop: false,
    },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const getweights = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/weighttracker/userinfo/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setUserWeight(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <section>
      <button
        variant="primary"
        onClick={() => {
          toggleShow();
          getweights();
        }}
        className="past-weight"
      >
        See Pass weight's
      </button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                    {userWeight != undefined &&
                      userWeight.map((el) => {
                        return (
                          <tr key={el.user_id}>
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
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
};

export default WeightJourney;
