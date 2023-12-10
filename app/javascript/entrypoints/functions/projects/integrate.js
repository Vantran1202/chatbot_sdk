const tabs = document.querySelectorAll(".nav-link-integrate");
const tabContents = document.querySelectorAll(".tab-pane-integrate");
const navTab = document.getElementById("nav-pills-integrate");

tabs.forEach(function(tab, index) {
    tab.addEventListener("click", function() {
        tabContents.forEach(function(content) {
            content.classList.remove("show", "active");
        });
        tabContents[index].classList.add("show", "active");
        tabs.forEach(function(otherTab) {
            otherTab.classList.remove("active");
        });
        tab.classList.add("active");
    });
});
let currentTabIndex = 0;
navTab.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        const tabs = document.querySelectorAll(".nav-link-integrate");
        const tabContents = document.querySelectorAll(".tab-pane-integrate");
        tabContents.forEach(function(content) {
            content.classList.remove("show", "active");
        });
        currentTabIndex = (currentTabIndex + 1) % tabs.length;
        if (currentTabIndex === tabs.length) {
            currentTabIndex = 0;
        }
        tabContents[currentTabIndex].classList.add("show", "active");
        tabs.forEach(function(tab, index) {
            tab.classList.remove("active");
        });
        tabs[currentTabIndex].classList.add("active");
        // tabs[currentTabIndex].focus();
    }
});
//Form zalo official account
const btnZaloSubmit = document.getElementById('btn-save-zalo');
if (btnZaloSubmit) {
    btnZaloSubmit.addEventListener("click", function() {
        $('.text-danger').text('');
        $.LoadingOverlay('show');
        var formData = new FormData();
        formData.append('name', $('#zalo-name').val());
        formData.append('oa_id', $('#zalo-oa-id').val());
        formData.append('client_id', $('#zalo-client-id').val());
        formData.append('client_secret', $('#zalo-client-secret').val());
        formData.append('access_token', $('#zalo-access-token').val());
        formData.append('refresh_token', $('#zalo-refresh-token').val());
        formData.append('project_id', $('#project-id').val());
        formData.append('zalo_id', $('#zalo-id').val());

        const urlCreateZalo = $('#zalo-form').attr('action');
        $.ajax({
        type: 'POST',
        url: urlCreateZalo,
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
            $.LoadingOverlay('hide');
            window.location.href = projectIndexUrl;
        },
        error: function(error) {
            console.log('error', error);
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.name ?
            $('#error-zalo_name').text(error.responseJSON.meta.errors.name[0]) :
            '';
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.oa_id ?
            $('#error-oa_id').text(error.responseJSON.meta.errors.oa_id[0]) :
            '';
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.client_id ?
            $('#error-client_id').text(error.responseJSON.meta.errors.client_id[0]) :
            '';
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.client_secret ?
            $('#error-client_secret').text(error.responseJSON.meta.errors.client_secret[0]) :
            '';
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.access_token ?
            $('#error-access_token').text(error.responseJSON.meta.errors.access_token[0]) :
            '';
            error.responseJSON.meta.errors && error.responseJSON.meta.errors.refresh_token ?
            $('#error-refresh_token').text(error.responseJSON.meta.errors.refresh_token[0]) :
            '';
            $.LoadingOverlay('hide');
        }
        });
    });
}


//Form zalo official account
const btnMessagerSubmit = document.getElementById('btn-save-messager');
if (btnMessagerSubmit) {
    btnMessagerSubmit.addEventListener("click", function() {
        $('.text-danger').text('');
        $.LoadingOverlay('show');
        var formData = new FormData();
        formData.append('project_id', $('#project-id').val());
        formData.append('name', $('#fanpage-name').val());
        formData.append('page_id', $('#fanpage-id').val());
        formData.append('access_token', $('#fanpage-access-token').val());

        const urlCreateFanpage = $('#fanpage-form').attr('action');
        $.ajax({
            type: 'POST',
            url: urlCreateFanpage,
            data: formData,
            contentType: false,
            processData: false,
            success: function(res) {
                $.LoadingOverlay('hide');
                window.location.href = projectIndexUrl;
            },
            error: function(error) {
                console.log('error', error);
                error.responseJSON.meta.errors && error.responseJSON.meta.errors.name ?
                $('#error-fanpage_name').text(error.responseJSON.meta.errors.name[0]) :
                '';
                error.responseJSON.meta.errors && error.responseJSON.meta.errors.access_token ?
                $('#error-fanpage_access_token').text(error.responseJSON.meta.errors.access_token[0]) :
                '';
                error.responseJSON.meta.errors && error.responseJSON.meta.errors.page_id ?
                $('#error-fanpage_id').text(error.responseJSON.meta.errors.page_id[0]) :
                '';
                $.LoadingOverlay('hide');
            }
        });
    });
}

function showIntroduction(element) {
    $(element).removeClass('d-none');
    $(element).prev().addClass('d-none');
}

function hideIntroduction(element) {
    $(element).addClass('d-none');
    $(element).prev().removeClass('d-none');
}
