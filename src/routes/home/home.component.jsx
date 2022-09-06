import "./home.style.scss";
import { useState, useEffect } from "react";
import FormInput from "../../components/form/formInput.component";
import Button from "../../components/button/button.component";
import ShowResult from "../../components/showResult/showResult.component";
const defaultFormFields = {
  burnedFuel: "",
  distanceKm: "",
  carMileageBefore: "",
  carMileageAfter: "",
};

function Home() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { burnedFuel, distanceKm, carMileageBefore, carMileageAfter } =
    formFields;
  const [currentResult, setCurrentResult] = useState();

  useEffect(() => {
    if (carMileageAfter && carMileageBefore) {
      setFormFields({
        ...formFields,
        distanceKm: carMileageAfter - carMileageBefore,
      });
    }
  }, [burnedFuel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      carMileageAfter < carMileageBefore ||
      carMileageAfter === carMileageBefore
    ) {
      setFormFields(defaultFormFields);
      return alert("Wrong value car mileage");
    }

    const result = ((burnedFuel * 100) / distanceKm).toFixed(2);
    setFormFields(defaultFormFields);
    setCurrentResult(result);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const clearCurrentRsult = () => {
    setCurrentResult("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="home-form">
        <FormInput
          label="Car mileage from the start of the measurement (optional)"
          type="number"
          onChange={handleChange}
          name="carMileageBefore"
          value={carMileageBefore}
          min="0"
        />
        <FormInput
          label="Car mileage from the end of the measurement (optional)"
          type="number"
          onChange={handleChange}
          name="carMileageAfter"
          value={carMileageAfter}
          min="1"
        />
        <FormInput
          label="Burned Fuel [L]"
          type="number"
          required
          onChange={handleChange}
          name="burnedFuel"
          value={burnedFuel}
          min="0"
        />
        <FormInput
          label="Distance [Km]"
          type="number"
          required
          onChange={handleChange}
          name="distanceKm"
          value={distanceKm}
        />

        <Button type="submit" buttonType="inverted">
          Submit
        </Button>
      </form>

      <ShowResult currentResult={currentResult} clear={clearCurrentRsult} />
    </div>
  );
}

export default Home;
