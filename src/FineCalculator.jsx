import { useState } from "react";

export default function FineCalculator() {
  const [daysLate, setDaysLate] = useState(0);
  const [bookType, setBookType] = useState("normal");
  const [additionalInfo, setAdditionalInfo] = useState([]);

  const renderInvalidDay = () => {
    if (daysLate <= 0) {
      return (
        <div className="invalid-feedback" style={{ display: "block" }}>
          The number of days must be greater than 0
        </div>
      );
    }
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
        const cloned = [...additionalInfo, e.target.value];
        setAdditionalInfo(cloned);
    } else {
        const indexToRemove = additionalInfo.indexOf(e.target.value);
        const modified = [ ...additionalInfo.slice(0, indexToRemove),
                ...additionalInfo.slice(indexToRemove+1)
        ];
        setAdditionalInfo(modified);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalFine = daysLate * (bookType==="normal" ? 1 : 2);
    if (additionalInfo.includes("missingPages")) {
        totalFine += 10;
    }
    if (additionalInfo.includes("damagedCover")) {
        totalFine += 20;
    }
    if (additionalInfo.includes("moreThan30Days")) {
        totalFine += 30;
    }
    alert("Total Fine: " + totalFine);

  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2 className="mb-4">Fine Calculator</h2>

      <div className="form-group mb-2">
        <label>Days Late:</label>
        <input
          type="number"
          className="form-control"
          value={daysLate}
          onChange={(event) => {
            // the event argument contains all the info about the event that happens
            setDaysLate(event.target.value);
          }}
        />
        {renderInvalidDay()}
      </div>

      <div className="form-group mb-2">
        <label>Type of Book:</label>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="bookType"
            value="normal"
            checked={bookType === "normal"}
            onChange={(event)=>{
                setBookType(event.target.value);
            }}
          />
          <label>Normal</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="bookType"
            value="reference"
            checked={bookType === "reference"}
            onChange={(event)=>{
                setBookType(event.target.value);
            }}
          />
          <label>Reference</label>
        </div>
      </div>

       <div className="form-group mb-2">
            <label>Additional Info</label>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="missingPages"
                    checked={additionalInfo.includes("missingPages")}
                    onChange={handleCheckbox}
                />
                <label className="form-check-label">Missing Pages</label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="damagedCover"
                    checked={additionalInfo.includes("damagedCover")}
                    onChange={handleCheckbox}
                />
                <label className="form-check-label">Damaged Cover</label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="moreThan30Days"
                    checked={additionalInfo.includes("moreThan30Days")}
                    onChange={handleCheckbox}
                />
                <label className="form-check-label">More than 30 Days Late</label>
            </div>
       </div>
       <input type="submit" class="btn btn-primary mt-3" value="Calculate"/>
    </form>
  );
}
