export default class Operation {
  constructor(date, userId, userType, type, operationDetails) {
    this.date = date;
    this.userId = userId;
    this.userType = userType;
    this.type = type;
    this.operationDetails = operationDetails;
  }

  setDate(date) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setUserType(userType) {
    this.userType = userType;
  }

  getUserType() {
    return this.userType;
  }

  setOperationDetails(operationDetails) {
    this.operationDetails = operationDetails;
  }

  getOperationDetails() {
    return this.operationDetails;
  }
}
