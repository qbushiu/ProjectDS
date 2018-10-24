var commentsApp = new Vue({
	el: '#aggregatorDiv',
	data : {
			sensorTimeSeries: [
				{
	        sensorDeployedId: '',
	        dataCollectedDate: '',
	        output: '',
	        heartRate: '',
	        compressorEfficiency: '',
	        availability: '',
	        reliability: '',
	        firedHours: '',
	        trips: '',
	        starts: ''
    		}
			],
			turbineDeployed: [
	    {
	        turbineDeployedId: 'blech',
	        turbineId: '',
	        siteId: '',
	        serialNumber: '',
	        deployedDate: '',
	        totalFiredHours: '',
	        totalStarts: '',
        	lastPlannedOutageDate: '',
        	lastUnplannedOutageDate: ''
    	}
		],
			testLorem: 'Test Lorem Ipsum Dolor'
		},
	  methods: {
	    fetchSensorTimeSeries() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/sensorTimeSeries.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.sensorTimeSeries = json;
					console.log(commentsApp.sensorTimeSeries);
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			fetchAllTurbinesData() {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/turbineDeployed.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.turbineDeployed = json;
					console.log(commentsApp.turbineDeployed);
				})
	      .catch( function(err){
	        console.log(err)
	      })
			},
			addComment() {
				console.log("Reached setter");
				fetch('http://ec2-13-233-134-241.ap-south-1.compute.amazonaws.com/api/comment.php', {
						body : JSON.stringify({
    					comment: document.getElementById('comment').value
  					}),
						// mode: "no-cors", // no-cors, cors, *same-origin
						headers: {
    					'Accept': 'application/json, text/plain, */*',
    					'Content-Type': 'application/json; charset=utf-8'
  					},
						method: "POST"
					}
				)
				.then(function(resp) {
					console.log(resp.json());
					console.log(document.getElementById("comment").value);
					plotAvailability();
				})
				.catch( function(err){
					console.log(err)
				})
			}
	  },
		created() {
			this.fetchSensorTimeSeries();
			this.fetchAllTurbinesData();
			// this.addComment();
			// this.checkData();
		}
	})

	function plotAvailability() {
		new Chart(document.getElementById("bar-chart"), {
						type: 'bar',
				data: {
					labels: ["9/10","9/11","9/12","9/13","9/14","9/15","9/16","9/17","9/18"],
					datasets: [
						{
							label: "Availability",
							backgroundColor: "#3e95cd",
							data: [98,97,95,98,97,96,98,97,98]
						}
					]
				},
				options: {
					legend: { display: false },
					title: {
						display: true,
						text: 'Availability % by day'
					}
				}
		});
	}
