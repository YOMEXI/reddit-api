import { Badge, Image, Form, FormControl } from "react-bootstrap";
import Link from "next/link";
import Axios from "axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
<i className="fas fa-search fa-2x mr-2"></i>;

const search = () => {
  const [name, setname] = useState("");
  const [Sub, setSub] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (name.trim() === "") {
      setSub([]);
    }
    searchSub();
  }, [name]);
  const searchSub = async () => {
    if (name === "") return;
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/sub/search/${name}`);
          setSub(data);
        } catch (error) {
          console.log(error);
        }
      }, 250)
    );
  };
  const router = useRouter();

  const moveToSub = (a) => {
    router.push(`/r/${a}`);
    setname("");
  };
  return (
    <>
      <div>
        <Form inline className="d-block">
          <input
            type="text"
            placeholder="Search"
            className="mr-sm-2  form-control"
            style={{ borderRadius: "49px", marginTop: ".1rem" }}
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <div>
            {Sub?.map((sub) => (
              <div
                className="justify-content-center text-center px-4 py-1 bg-light text-dark "
                style={{ cursor: "pointer" }}
              >
                <p onClick={() => moveToSub(sub.name)}>{sub.name}</p>
              </div>
            ))}
          </div>
        </Form>
      </div>
    </>
  );
};

export default search;
