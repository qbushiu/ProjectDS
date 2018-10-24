$(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });

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
