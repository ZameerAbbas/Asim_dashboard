import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";

const SpecialOffer = () => {

  // soting data nodes in state 
  const [offerRecords, setofferRecords] = useState([]);

  // inintal data nodes 
  const [newofferData, setNewofferData] = useState({
    offerName: "",
    offerWeight: "",
    offerInStock: "",
    offerPrice: "",
    offerPriceoff:"",
    offerDescrition: "",
    offerImage: null,
    offerImageURL: "",
    offerImagesub: null,
    offerImagesubURL: "",
    offerImagesubT: null,
    offerImagesubURLT: "",
    offerImagesubTH: null,
    offerImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  // initall editable data storing
  const [editedofferData, setEditedofferData] = useState({
    offerName: "",
    offerWeight: "",
    offerInStock: "",
    offerPrice: "",
    offerPriceoff:"",
    offerDescrition: "",
    offerImage: null,
    offerImageURL: "",
    offerImagesub: null,
    offerImagesubURL: "",
    offerImagesubT: null,
    offerImagesubURLT: "",
    offerImagesubTH: null,
    offerImagesubURLTH: "",
  });

  useEffect(() => {
    const offerRef = ref(db, "specialOffer");
    onValue(offerRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setofferRecords(records);
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const specialRef = ref(db, "specialOffer");
    push(specialRef, {
      ...newofferData,
      offerPrice: parseFloat(newofferData.offerPrice),
      offerPriceoff: parseFloat(newofferData.offerPriceoff),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewofferData({
          offerName: "",
          offerWeight: "",
          offerInStock: "",
          offerPrice: "",
          offerPriceoff:"",
          offerDescrition: "",
          offerImage: null,
          offerImageURL: "",
          offerImagesub: null,
          offerImagesubURL: "",
          offerImagesubT: null,
          offerImagesubURLT: "",
          offerImagesubTH: null,
          offerImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewofferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImage: imageFile,
          offerImageURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesub: imageFile,
          offerImagesubURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub2 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesubT: imageFile,
          offerImagesubURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub3 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesubTH: imageFile,
          offerImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setEditedofferData({
      ...data,
      offerImageURL: data.offerImageURL,
      offerImagesubURL: data.offerImagesubURL,
      offerImagesubURLT: data.offerImagesubURLT,
      offerImagesubURLTH: data.offerImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const offerRef = ref(db, `specialOffer/${editRecordKey}`);
    update(offerRef, editedofferData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedofferData({
          offerName: "",
          offerWeight: "",
          offerInStock: "",
          offerPrice: "",
          offerPriceoff:"",
          offerDescrition: "",
          offerImage: null,
          offerImageURL: "",
          offerImagesub: null,
          offerImagesubURL: "",
          offerImagesubT: null,
          offerImagesubURLT: "",
          offerImagesubTH: null,
          offerImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating offer record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedofferData({
      offerName: "",
      offerWeight: "",
      offerInStock: "",
      offerPrice: "",
      offerPriceoff:"",
      offerDescrition: "",
      offerImage: null,
      offerImageURL: "",
      offerImagesub: null,
      offerImagesubURL: "",
      offerImagesubT: null,
      offerImagesubURLT: "",
      offerImagesubTH: null,
      offerImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const offerRef = ref(db, `specialOffer/${key}`);
    remove(offerRef)
      .then(() => {
        console.log("offer record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting offer record: ", error);
      });
  };

  return (
    <div className="Dashboardconatainer">
      <div className="logperson">
        <p className="Toptext">
          <Logout />
        </p>
      </div>
      <div className="inputSectioncreate">
        <h1>Offer Items Dashboard</h1>

        {/* Input form to create new mineral records */}
        <div>
          <h2>Create New Offer 2 offer limit</h2>
          <div>
            <div className="lablesFLex">
              <label>
                Offer item Name : <br />
                <input
                  type="text"
                  name="offerName"
                  value={newofferData.offerName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Offer item Weight : <br />
                <input
                  type="text"
                  name="offerWeight"
                  value={newofferData.offerWeight}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Offer item InStock : <br />
                <input
                  type="text"
                  name="offerInStock"
                  value={newofferData.offerInStock}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Offer item Price : <br />
                <input
                  type="number"
                  name="offerPrice"
                  value={newofferData.offerPrice}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Offer item Priceoff : <br />
                <input
                  type="number"
                  name="offerPriceoff"
                  value={newofferData.offerPriceoff}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Offer item Descrition : <br />
                <input
                   type="text"
                  name="offerDescrition"
                  value={newofferData.offerDescrition}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Offer Itme Main Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub}
                />
              </label>
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub2}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub3}
                />
              </label>

              <button onClick={createNewRecord}>Create Offer Item</button>
            </div>
          </div>
        </div>
      </div>
      {/* Display existing mineral records */}
      <div>
        <div className="inputSectioncreate">
          <h2>Existing Offer Items</h2>
          <div>
            {offerRecords.map((record) => (
              <div key={record.key}>
                {/* Display mineral details and image */}
                {editMode && editRecordKey === record.key ? (
                  <div className=" stockitem">
                    <div className="parentGrid ">
                      <div>
                        <label>
                          Offer Item Name : <br />
                          <input
                            type="text"
                            name="offerName"
                            value={editedofferData.offerName}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerName: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Offer Item  Weight : <br />
                          <input
                            type="text"
                            name="offerWeight"
                            value={editedofferData.offerWeight}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerWeight: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          In Stock : <br />
                          <input
                            type="text"
                            name="offerInStock"
                            value={editedofferData.offerInStock}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerInStock: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Offer Item  Price : <br />
                          <input
                            type="number"
                            name="offerPrice"
                            value={editedofferData.offerPrice}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerPrice: e.target.value,
                              }))
                            }
                          />
                        </label>
                       
                        <label>
                          Offer Item  Price : <br />
                          <input
                            type="number"
                            name="offerPriceoff"
                            value={editedofferData.offerPriceoff}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerPriceoff: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Offer  Description : <br />
                          <input
                            type="text"
                            name="offerDescrition"
                            value={editedofferData.offerDescrition}
                            onChange={(e) =>
                              setEditedofferData((prevData) => ({
                                ...prevData,
                                offerDescrition: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                        Offer Main Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Offer Sub  Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                        Offer Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub2}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                        Offer Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub3}
                          />
                        </label>
                      </div>
                    </div>
                    <button onClick={saveEditedRecord}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div className="stockitem">
                    <div className="parentGrid">
                      <div>
                        Offer Item Name : <br />
                        {record.data.offerName}
                      </div>
                      <div>
                        Offer Item Weight : <br /> {record.data.offerWeight}
                      </div>
                      <div>
                        Offer Item InStock : <br /> {record.dataofferlInStock}
                      </div>
                      <div>
                        Offer Item Price : <br /> {record.data.offerPrice}
                      </div>
                      <div>
                        Offer Item Priceoff : <br /> {record.data.offerPriceoff}
                      </div>
                      <div>
                        Offer Item Descrition : <br />{" "}
                        {record.data.offerDescrition}
                      </div>

                      <div>
                        {record.data.offerImageURL && (
                          <img
                            src={record.data.offerImageURL}
                            alt={`specialOffer: ${record.data.offerName}`}
                          />
                        )}
                      </div>

                      <div>
                        {record.data.offerImagesubURL && (
                          <img
                            src={record.data.offerImagesubURL}
                            alt={`specialOffer: ${record.data.offerName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.offerImagesubURLT && (
                          <img
                            src={record.data.offerImagesubURLT}
                            alt={`specialOffer: ${record.data.offerName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.offerImagesubURLTH && (
                          <img
                            src={record.data.offerImagesuoffer}
                            alt={`specialOffer: ${record.data.offerName}`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="editBtn">
                      <button
                        onClick={() => startEditing(record.key, record.data)}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteRecord(record.key)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
