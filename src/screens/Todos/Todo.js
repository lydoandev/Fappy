import React, {Component} from 'react';
import {addNew} from '../../redux/todoRedux/action';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  SectionList,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Items from '../../components/Todos/Item';
import {connect} from 'react-redux';
import _ from 'lodash';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '30-12-2019',
    };
  }

  onChangeText = text => {
    this.setState({
      title: text,
    });
  };
  updateState = (title, date) => {
    const id = this.props.tasks.length;
    const data = {id, date, title, isCompleted: false};
    this.props.add_task(data);
  };
  convertData = tasks => {
    const groupData = _.groupBy(tasks, 'date');
    const sectionData = _.map(groupData, (value, key) => {
      return {
        date: key,
        data: value,
      };
    });
    return sectionData;
  };
  render() {
    const switchData = this.convertData(this.props.tasks);
    return (
      <View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Todo"
            onChangeText={text => this.onChangeText(text)}
            value={this.state.title}
          />
          <DatePicker
            style={{width: 200}}
            mode="date"
            date={this.state.date}
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate={new Date()}
            maxDate="01-06-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
          <TouchableOpacity
            style={styles.add_btn}
            onPress={() => this.updateState(this.state.title, this.state.date)}>
            <Text style={{fontWeight: 'bold'}}>ADD</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <SectionList
            sections={switchData}
            extraData={this.props.tasks}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Items item={item} />}
            renderSectionHeader={({section: {date}}) => (
              <Text style={styles.date}>{date}</Text>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_task: task => dispatch(addNew(task)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todo);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C0C0C0',
    marginBottom: 10,
  },
  form: {
    margin: 20,
  },
  add_btn: {
    backgroundColor: '#FFA07A',
    height: 30,
    marginTop: 20,
    borderRadius: 3,
    alignItems: 'center',
    paddingTop: 5,
  },
  date: {
    borderTopWidth: 1,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
});
