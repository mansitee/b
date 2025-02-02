function updateIframeSrc() {
const baseUrl = 'https://doodstr.com/p0?id='; const identifiers = ['w4efujnzopov','e7fp1q9bphc0', '8sd6jdf2ejom', 'rE9WSgpGrc7', 'meeMlSpZUVh',  '2a8uD6ywSQ1', '6ep6em95r25g',
'vpvxf3abxtml', 'ttr2bo4gxgni', 's4is1d3w22ga', 'ehp8zhctk0ni', 'ayz877ah4rdb', 'lk3zqb3o4fqm', 'w8r5e37ag20a', 'jmsf291e455p', 'm19nzhwc7zg2', '7x6avwnpb4la', '6JjQUW99eIq',  '5nFfaxd2tuz', 'k39klxf81oc1', '3g34rf9n735x', '2w939n49q2r1', 'c4q2dwzaya99', 'eauzsmvszhb8', 'HLGbn5xMl2h', 'carsetaqtwsm', 'kloddlksw5t4', 'fxpdc51m66zt', '92l44ywiw1ja', 'lfG1xxmTX74',  'bnbl6kxk9qaf', '9hs62i74awdv', 'ben36wireshh', 'nrg6nbwj6wup', '8dq1it4JyrZ', '693hbehlz6vr', 'w1guk1gxdl62', '1594ggx28va7', '4ra2yw79s13i', 'Kyh1LLSQU6c',  '9nfzatlzz597', '6dv7oahem990', 'kl45cusfl225', 'rs745brhk6u1', 'xvbs6nss5t0b', 'krmf60dlbi28', 'TB3Rtqzv86P', '9b57ceh88fk9', '7qgsxw93522u', 'lwl694cw36ky', 'k4936d2qwdwm', 'uehtffng2vrd', 'xf61v5ly2a0k', '4m0a5y4ejb2l', 'aqhhf8fjjk9n', 'nyq4zaotuvdh', 'uydy90al09tp', '9avibftwwazd', 'iow20t6xt2nk',

'1qw4zvkdmoxk', '0tkh9whonz7h',
'9qzpbl6yy7w0', 'c09zaotpspup',
'jve21dx4swaj', 'ynrab2tzeiea',
'brz7m0rw7wre', 'uspfkwnj0mib',
'uspfkwnj0mib', 'brz7m0rw7wre',
'ynrab2tzeiea', '22yxxeszdsua',
                
'0fxh862qangd', '49u2ga2cmtyd',
'yybz54oob7gk', 'ngkb6sl7awyh',
'urqjlzwci7cf', 'kthbmmkq7c1i',
'swhc8dt8x3xa', '3LxD8aGvEda',
'motd4270o7ks', '3p4r2gfnq888',
'2mtx85xnxm55', 'uamoiycetr8c',
'xxxayxtap4l6', 'zt5giclgkv93',
'jirzny68mwe6', 'hohhzrv1a3jj',
'jdfuabz0nnhf', '6ukyra9arsjg',
'zzvgqiiejuwa', 'qe0v1yrdsl81',
'jdfuabz0nnhf', '0x5kfyqmxipt',
'uc2y9j4ig85g', 'nyojg04pv4vy',
'UCbSUaSAndv',  '5tkda0rxzs1s',
'swBT4R6QSMY',  'qsk1a70s9rt4',
'ywjh7vgr8z3w', 'cij122uczgqn',
'k931dijjw7an', 'oe61o2yflioy',
'42yr6b7p5rmx', '18vrhtomhptw',
'r3a8hbmaftmv', 'm21n21778rnn',
'vmxdg0voqxka', '99wuo588rxx9',
'3vxiwocuw7ji', 'xxr4swzkxddr',
'3r8lzghssgvb', 'sk7zyxgg5rp8',
'sQPETpm6IEr',  '3vqv7y1p2xqw',
'1avzrr0z553i', 'e72hq4uv27qo',
'lv0zh5twu27i', 'sr16xpctwb1d',
'3elhm27uagp4', 'kw4xq2i12ib4',
'u3nvtw686a75', 'G7sNpXhKB8s',
'ubfr1tsp6po8', '21enk1onyj9b',
'x6qHISFsCvu',  '6djquu5fl7h4',
'4vPjKRT1l8x',  'imirq1av1ogz']; 

// Array identifier 
const container = document.getElementById('container');

identifiers.forEach(identifier => {
const div = document.createElement('div');
div.className = 'iframe-container';
 
const infoDiv = document.createElement('div');
infoDiv.className = 'video-info';

const title = document.createElement('h2');
title.textContent = identifier;

const username = document.createElement('p');
username.textContent = '';

infoDiv.appendChild(title);
infoDiv.appendChild(username);

const iframe = document.createElement('iframe');
iframe.dataset.src = `${baseUrl}${identifier}`;
iframe.title = 'Embedded Content from doodhd.com';
iframe.width = "570";
iframe.height = "315";
iframe.frameBorder = "0";

div.appendChild(infoDiv);
div.appendChild(iframe);
container.appendChild(div); }); }

document.addEventListener("DOMContentLoaded", function() { updateIframeSrc();

const iframes = document.querySelectorAll('iframe');

const lazyLoad = (entries, observer) => {entries.forEach(entry => {
if (entry.isIntersecting) {
const iframe = entry.target;
iframe.src = iframe.dataset.src;
observer.unobserve(iframe);} }); };

const observer = new IntersectionObserver(lazyLoad, { rootMargin: "0px 0px 200px 0px" });iframes.forEach(iframe => { observer.observe(iframe); });

// Initialize jQuery lazyload plugin
$(document).ready(function() {
$("iframe").lazyload({
effect: "fadeIn"}); });

// Initialize jQuery mediaWrapper.js plugin
$(document).ready(function() {
$("iframe").mediaWrapper({
intrinsic: true, baseWidth: 16,
baseHeight: 9 }); }); }); 
 