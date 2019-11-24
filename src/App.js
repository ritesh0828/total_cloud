import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Container, Button } from 'react-bootstrap';


class App extends React.Component { //la import component
   constructor(props) {
    super(props);
    this.defaultItems = 10;
    this.state = {
      numberOfSelectedItem: 0,
      selectItem: [],
    }
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.selectYourItem = this.selectYourItem.bind(this);
   }

  renderItem(index, isItemList) {
    // if index present selectItem
    return(
      <div style={{ borderRadius: '50%', height: '20px', width: '20px', backgroundColor: 'green',  }} onClick={() => this.selectYourItem(index, isItemList)}/>
    );
  }

  selectItem() {
    // if empty do nothing
    const {numberOfSelectedItem, selectItem} = this.state;
    if (selectItem.length > 0) {
      this.setState({ numberOfSelectedItem: numberOfSelectedItem + 1});
      this.setState({ selectItem: []});
    } else {
      alert('Please select item first')
    }
  }

  removeItem() {
    const {numberOfSelectedItem} = this.state;
    if (numberOfSelectedItem > 0) {
      this.setState({ selectItem: [] });
      this.setState({ numberOfSelectedItem: numberOfSelectedItem - 1});
    } else {
      alert('There is no item in cart, Please select item first')
    }
  }

  selectYourItem(index, isItemList) {
    let selectItem = [];
    if (!isItemList) {
    selectItem.push(index);
    this.setState({ selectItem});
    }
    // this.state.selectItem.push(index);
  }

  renderItems(numberOfItem, isItemList) {
    let items = Array();
    const { selectItem }  = this.state;
    for (var i = numberOfItem; i > 0; i--) {
      const showColor = selectItem.includes(i) && !isItemList;
      items.push(
        <div style={{ margin: '5px', backgroundColor: showColor ? 'blue' : 'white'}}>
        {this.renderItem(i, isItemList)}
        </div>
      );
    }
    return items;
  }

  render() {
    return (
      <Container>
        <b style={{ margin: '30rem'}}>WELCOME</b><br/><br/>
        <Row>
          <Col style={{ border: '1px solid'}}>{this.renderItems(this.defaultItems, false)}</Col>
          <Col>
            <Button style={{ margin: '55px'}} variant="primary" onClick={() => this.selectItem()} >Add to cart</Button><br/>
            <Button style={{ margin: '45px'}} variant="danger" onClick={() => this.removeItem()}>Remove to cart</Button>
          </Col>
          <Col style={{ border: '1px solid'}}>{this.renderItems(this.state.numberOfSelectedItem, true)}</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
