export const validate = (dog) => {
  let error = {};
  let numberArray = [];
  let specialArray = [];

  let name = dog.name;

  let number = /[0-9]/gi;
  let special = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/gi;
  numberArray = name.match(number);
  specialArray = name.match(special);

  //************************ validate name ***********************************/
  if (dog.name === "") error.name = "Name is required";

  if (numberArray?.length > 0) error.name = "Name cannot contain numbers";

  if (specialArray?.length > 0)
    error.name = "Name cannot contain special characters";

  //************************ validate heightMin ******************************/
  if (dog.heightMin === "") error.heightMin = "Height min is required";

  if (dog.heightMin > dog.heightMax)
    error.heightMin = "Height min must be less than height max";

  //************************ validate heightMax ******************************/
  if (dog.heightMax === "") error.heightMax = "Height max is required";

  //************************ validate weightMin ******************************/
  if (dog.weightMin === "") error.weightMin = "Weight min is required";

  if (dog.weightMin > dog.weightMax)
    error.weightMin = "Weight min must be less than weight max";

  //************************ validate weightMax ******************************/
  if (dog.weightMax === "") error.weightMax = "Weight max is required";

  //************************ validate lifeSpanMin ******************************/
  if (dog.lifeSpanMin === "") error.lifeSpanMin = "Life span min is required";

  if (dog.lifeSpanMin > dog.lifeSpanMax)
    error.lifeSpanMin = "Life span min must be less than life span max";

  //************************ validate lifeSpanMax ******************************/
  if (dog.lifeSpanMax === "") error.lifeSpanMax = "Life span max is required";
  //************************ validate temperaments ******************************/
  if (dog.temperaments.length === 0)
    error.temperaments = "Temperament is required";

  return error;
};
