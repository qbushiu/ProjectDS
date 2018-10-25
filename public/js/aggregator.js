var commentsApp = new Vue({
	el: '#aggregatorDiv',
	data : {
<<<<<<< HEAD
		clientInfo: [
			{
				clientId: '',
        clientName: '',
        clientDescription: '',
        gicsSector: '',
        gicsSubIndustry: '',
        headquarters: ''
			}
		],
=======
>>>>>>> 5eea8e6d2e86538459e1995e82901a4df85c7c66
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
	        turbineDeployedId: '',
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
<<<<<<< HEAD
			fetchCientInfo() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/client.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.clientInfo = json;
					console.log(commentsApp.clientInfo);
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			fetchSensorTimeSeries() {
=======
	    fetchSensorTimeSeries() {
>>>>>>> 5eea8e6d2e86538459e1995e82901a4df85c7c66
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
<<<<<<< HEAD
			},
			addClientComment() {
			  fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/clientNotes.php', {
			      body : JSON.stringify({

			          "clientId": document.getElementById("clientId").value,
			          "notes": document.getElementById("comment").value

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
			    // console.log(document.getElementById("comment").value);
			    // plotAvailability();
			  })
			  .catch( function(err){
			    console.log(err)
			  })
=======
>>>>>>> 5eea8e6d2e86538459e1995e82901a4df85c7c66
			}
	  },
		created() {
			this.fetchSensorTimeSeries();
			this.fetchAllTurbinesData();
<<<<<<< HEAD
			this.fetchCientInfo();
=======
>>>>>>> 5eea8e6d2e86538459e1995e82901a4df85c7c66
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
