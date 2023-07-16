new Vue({
el:'#todo_app',
data:{
	submitting:false,
	error:false,
	success:false,
	newTask:'',
	tasks:[],
	singleTask:[]
},
mounted(){
	if(localStorage.getItem('tasks')){
		this.tasks = JSON.parse(localStorage.getItem('tasks'));
	}
},
methods:{
	addTask(){
		this.clearStatus();
		this.submitting = true;
			
		if (this.invalidName){
			this.error = true;
			return;
		}
		if (this.newTask !=='') {
			this.singleTask = {
				name:this.newTask,
				status:'created'
			};
			this.tasks.push(this.singleTask);
			this.success = true;
			this.newTask = '';
			this.submitting = false;
			this.$refs.firstInput.focus();
			// Update local storage
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
		}
	},
	removeTask(index){
		this.clearStatus();
		this.tasks.splice(index,1);
		// Update local storage
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	},
	completeTask(index){
		this.clearStatus();
		this.tasks[index]['status'] = 'completed';
		// Update local storage
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	},
	clearStatus(){
		this.success = false;
		this.error = false;
	},
	clearLocalStorage() {
		this.clearStatus();
	    localStorage.removeItem('tasks');
	    this.tasks = []; // Clear the tasks array in your Vue instance
	},
},
computed:{
	invalidName(){
		return this.newTask === '';
	},
	taskExists(){
		return this.tasks.length>0;	
	}
}
});