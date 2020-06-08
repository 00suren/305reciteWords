Page({
  data: {
    input: '',                //输入的标题
    todos: [],                //任务列表
    leftCount: 0,             //剩余任务的数量
    allCompleted: false,      //是否全部完成  
    
  },

  save: function () {
    //保存输入的任务到本地
    wx.setStorageSync('todo_list', this.data.todos);
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list');
    if (todos) {
      //统计未完成任务的数量
      var leftCount = todos.filter(function (item) {
        return !item.completed;
      }).length
      this.setData({ todos: todos, leftCount: leftCount });
    }
  },

  onShow:function(){

    this.load();
  },

  inputChangeHandle: function (e) {
    //输入任务标题时触发
    this.setData({ input: e.detail.value });
  },

  addTodoHandle: async function (e) {
    //添加任务
      if (!this.data.input || !this.data.input.trim()) return;      //如果没有输入或者输入了空格，就不执行下面的代码
      var todos = this.data.todos;
      todos.push({ name: this.data.input, completed: false });
      var logs = this.data.logs;
      
      this.setData({
        input: '',
        todos: todos,
        leftCount: this.data.leftCount + 1,
        logs: logs
      })
      this.save();
  },

  toggleTodoHandle: function (e) {
    //标记任务为已完成
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    var logs = this.data.logs
    
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
     
    })
    this.save()
  },

  removeTodoHandle:async function (e) {
    //删除任务
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    var remove = todos.splice(index, 1)[0];
    var logs = this.data.logs;
    let openid = getApp().globalData.openid;
    console.log("index:" + index);
  
    console.log("删除本地数据");
      
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
    })
       
  },

  toggleAllHandle: function (e) {
    //标记所有任务为已完成
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }

    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
    
    })
    this.save()
  },
  

})
