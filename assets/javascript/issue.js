$(document).ready(function () {
    $('#dateissue').val()
    var d=new Date()
    var cd=(d.getFullYear())+"-"+(d.getMonth()+1)+"-"+(d.getDate())
    $('#dateissue').val(cd)
    $.getJSON("/getcategoriesjson", { ajax: true }, function (data) {

        $.each(data, function (index, item) {
            $('#categoryid').append($('<option>').text(item[1]).val(item[0]))
        })

    })

    $('#categoryid').change(function () {
        $('#subcategoryid').empty()
        $.getJSON("/getsubcategoryjson", { ajax: true, categoryid: $('#categoryid').val() }, function (data) {
            $('#subcategoryid').append($('<option>').text('-Select Sub Category-'))
            $.each(data, function (index, item) {
                $('#subcategoryid').append($('<option>').text(item[2]).val(item[1]))
            })

        })

    })

    $('#subcategoryid').change(function () {
        $('#productid').empty()
        $.getJSON("/getproductjson", { ajax: true, subcategoryid: $('#subcategoryid').val() }, function (data) {
            $('#productid').append($('<option>').text('-Select Product-'))
            $.each(data, function (index, item) {
                $('#productid').append($('<option>').text(item[3]).val(item[2]))
            })

        })

    })

    $('#productid').change(function () {
        $('#finalproductid').empty()
        $.getJSON("/getfinalproductjson", { ajax: true, productid: $('#productid').val() }, function (data) {
            $('#finalproductid').append($('<option>').text('-Select Final Product-'))
            $.each(data, function (index, item) {
                $('#finalproductid').append($('<option>').text(item[4]).val(item[3]))
            })

        })

    })

$('#finalproductid').change(function () {

        $.getJSON("/displayfinalproductbyidjson", { ajax: true, finalproductid: $('#finalproductid').val() }, function (data) {


                $('#currentstock').html(data.stock)


        })

    })
$('#qtyissue').keyup(function(){
if(parseInt($('#currentstock').html())>=parseInt($('#qtyissue').val()))
{$('#btnsubmit').attr('disabled',false)}
else
{$('#btnsubmit').attr('disabled',true)}
})

})