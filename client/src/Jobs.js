import React from 'react'
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


export default function Jobs({jobs}) {

    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);


    function scrollToTop () {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      };


    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        scrollToTop();
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        scrollToTop();
    }    

    console.log(jobs[0]);

    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6">
                Found {numJobs} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log('clicked');
                        handleClickOpen();
                        selectJob(job);
                    }}/>
                )
            }
            <div>
                Page {activeStep} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />
        </div>
    )
}