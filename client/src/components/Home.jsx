import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

import { fetchCandidates } from '../redux/modules/candidates';
import { fetchApplications } from '../redux/modules/applications';
import { fetchQuestions } from '../redux/modules/questions';
import Candidate from './Candidate';
import CandidateList from './CandidateList';

class Home extends Component {
  
  componentDidMount() {
    const { fetchCandidates, fetchQuestions, fetchApplications } = this.props;
    
    // Fetch data
    fetchCandidates();
    fetchQuestions();
    fetchApplications();
  }

  render() {
    const { candidates } = this.props;
    return(
      <Container>
        <Row style={{marginTop: 40}}>
          <Col 
            xs="12" 
            md="4"
          > 
            {/* render the list of candidates */}
            <CandidateList {...this.props} /> 
          </Col>
          <Col 
            xs="12" 
            md="8"
          >
            <Switch>
              {/* render a route for selected candidate */}
              <Route 
                path="/candidate/:id" 
                render={(props) => <Candidate {...this.props} {...props} />} 
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {
  candidates: PropTypes.object.isRequired,
  applications: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  fetchCandidates: PropTypes.func.isRequired,
  fetchApplications: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ candidates, applications, questions }) => ({ 
  candidates, 
  applications,
  questions 
});

export default connect(mapStateToProps, { fetchCandidates, fetchApplications, fetchQuestions })(Home);
