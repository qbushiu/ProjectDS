var commentsApp = new Vue({
	el: '#aggregatorDiv',
	data : {
		images: {
				he: "images/he.jpg",
				pte: "images/pte.jpg"
			},
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
		sites: [
			{
				siteId: '',
				clientId: '',
				siteName: '',
				siteDescription: '',
				primaryContact: '',
				capacity: ''
			}
		],
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
			turbineDeployedSpecific:[
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
		comments: [
    	{
        noteId: '',
        notes: '',
        clientId: ''
    	}
		],
			testLorem: 'Test Lorem Ipsum Dolor',
			plannedOutageDiff: '',
			unplannedOutageDiff: ''
		},
	  methods: {
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
			fetchSitesInfo() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/site.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.sites = json;
					console.log(commentsApp.sites);
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
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
			fetchSpecificTurbinesData(siteId) {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/turbineDeployed.php?turbineDeployedId='+siteId)
	      .then(response => response.json())
	      .then (json => {
					commentsApp.testLorem = "Changed lorem ipsum dolor";
					commentsApp.turbineDeployedSpecific = json;
					commentsApp.plannedOutageDiff = calcTimeDiff(commentsApp.turbineDeployedSpecific[0].lastPlannedOutageDate);
					commentsApp.unplannedOutageDiff = calcTimeDiff(commentsApp.turbineDeployedSpecific[0].lastUnplannedOutageDate)
					console.log(commentsApp.turbineDeployedSpecific);
				})
	      .catch( function(err){
	        console.log(err)
	      })
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
			},
			fetchClientComments() {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/clientNotes.php?clientId=2')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.comments = json;
					console.log(commentsApp.comments);
				})
	      .catch( function(err){
	        console.log(err)
	      })
			}
	  },
		created() {
			this.fetchSensorTimeSeries();
			this.fetchAllTurbinesData();
			this.fetchCientInfo();
			this.fetchSitesInfo();
			this.fetchClientComments();
			// this.addComment();
			// this.checkData();
		}
	})

	function calcTimeDiff(date){
		given = moment(date, "YYYY-MM-DD");
		current = moment().startOf('day');
		diff = moment.duration(given.diff(current)).asDays();
		return diff+" days ago";
	}

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
