import React, { useEffect } from 'react';
// Components
import { Container, Spinner } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser } from '../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../util/functions';

const MyGear = (props) => {
  const { getByUser } = props;
  const userId = props.user.credentials._id;

  useEffect(() => {
    getByUser(userId, 'purchases');
  }, [getByUser, userId]);

  let userGearMarkup = (
    <div className="user-view__form-container">
      <div className="cta__content">
        <h2 className="heading-secondary ma-bt-md">Here will be the gear</h2>
      </div>
    </div>
  );

  let markup;
  if (props.data.loading) {
    markup = <div className="spinner--container"><Spinner className="spinner" size="md" color="dark" /></div>;
  } else if (props.data.gear.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else {
    markup = userGearMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser })(MyGear);
