import { Alert, Spinner } from "react-bootstrap";

export const successMessage = (success) => {
  return (
    <Alert
      variant="success"
      className="align-items-center d-flex justify-content-center"
    >
      {success}
    </Alert>
  );
};

export const errorMessage = (error) => {
  return (
    <Alert
      variant="danger"
      className="align-items-center d-flex justify-content-center"
    >
      {error}
    </Alert>
  );
};

export const Loader = () => {
  return (
    <div className="align-items-center d-flex justify-content-center">
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
