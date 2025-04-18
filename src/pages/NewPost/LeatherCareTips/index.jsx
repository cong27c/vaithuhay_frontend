import News from "~/components/News";

function LeatherCareTips() {
  const articles = [
    {
      desc: `
                    <p>Nếu bạn sở hữu một hoặc nhiều đôi giày da, thì bạn chắc chắn đã tự hỏi: Mình có thể làm gì để bảo vệ đôi giày da? Làm cách nào để bảo quản giày da đúng cách? Những đôi giày này rất nhạy cảm với nước và hóa chất, vì da có thể dễ dàng bị hư hỏng. Hãy cùng Vài Thứ Hay tìm hiểu những cách bảo quản giày da đẹp và bền một cách thật dễ dàng nhé!</p>
                    <img src="https://file.hstatic.net/1000069970/file/xit-chong-tham-giay-da_239a64992f094ae295e08833a4ef70ce_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <p>Đàn ông, rằng có ai thừa nhận mình không bị lôi cuốn vào các sản phẩm được làm bằng da như: giày, ví, ủng, túi xách, áo khoác, găng tay. Và lý do cho sự hấp dẫn của da thật sự không khó hiểu bởi từ xa xưa vật liệu này được tổ tiên chúng ta sử dụng để phục vụ cho cuộc sống hàng ngày. Cùng xem các cách bảo quản giày da an toàn và hiệu quả dưới đây nhé!</p>
                    <h2>Hướng dẫn cách vệ sinh và chăm sóc giày da</h2>
                    <p>Tháo dây giày ra và giặt chúng bằng xà phòng, sau đó lau bụi bẩn bằng miếng vải mềm.
                    Sử dụng bàn chải mềm hoặc vải mềm kết hợp với chất tẩy rửa chuyên dụng cho giày để làm sạch vết bẩn cứng đầu.</p>
                    <p><strong>Vệ sinh giày da sạch sẽ</strong></p>
                    <p>Nếu những đôi giày của bạn dính nước biển, nước muối hãy sử dụng 1 phần giấm và 2 phần muối kết hợp vải mềm để lau sạch giày.</p>
                    <p>Hãy để giày khô ở nhiệt độ phòng, không nên sấy và phơi ngoài ánh mặt trời vì sẽ nhanh làm hỏng giày, có thể để qua đêm được nữa nhé.</p>
                    <p><strong>Đánh bóng giày</strong></p>
                    <p>Sau khi mang 1 thời gian đôi giày của bạn có thể bị khô nứt vì vậy phương pháp đánh bóng giày rất phù hợp để giúp đôi giày của bạn được giữ ẩm, đẹp và bền hơn. Hãy bôi đều kem lên bề mặt giày sau đó để khô giày trong 15p là được nhé.</p>
                    <img src="https://file.hstatic.net/1000069970/file/danh-bong-giay_47c4bc2575a442278083a77767e915a1_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <figcaption>Chăm sóc và bảo quản giày da bóng</figcaption>
                    <p><strong>Xịt chống thấm</strong></p>
                    <p>Đây là cách rất phổ biến của các tín đồ mang giày sử dụng giúp bảo vệ giày khỏi các tác nhân như nước, chất lỏng, chất bẩn. Cách sử dụng: sử dụng các phụ kiện giày như chai xịt chống thấm, xịt cách giày tầm 15-20 cm, xịt đều lên giày sau đó để khô và sử dụng nhé.</p>
                     <img src="https://file.hstatic.net/1000069970/file/xit-chong-tham-cho-giay-da_27872b5b04b349b4b1cf6a61ed7b1c12_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <figcaption>Xịt chống thấm cho giày da</figcaption>
                    <h2>Hướng dẫn cách bảo quản giày da </h2>
                    <p>Tùy vào từng loại giày da chúng ta sẽ có những cách bảo quản giày da hiệu quả và tốt nhất. Dưới đây là hướng dẫn chi tiết cách bảo quản giày da tốt nhất cho bạn.</p>
                    <p><strong>Giày da thường</strong></p>
                    <p>Dùng sữa tươi để lau giúp cho giày không bị nứt. Dùng tất (vớ) chân cũ thấm vào xi để đánh giày hoặc bàn chải đánh xi sẽ giúp da giày sáng bóng.</p>
                    <p><strong>Nếu giày bị trầy xước:</strong> Thoa một ít dầu thực vật lên vết xước trên da bằng một miếng vải cotton. Sau khi dầu đã khô, hãy dùng vải mềm lau lại cho thật sạch. Lặp lại các thao tác trên nếu vết xước vẫn chưa biến mất.</p>
                     <img src="https://file.hstatic.net/1000069970/file/mo-vet-xuoc-cho-giay-da_68331dbea7bc432a9437f37262e90493_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <figcaption>Vết xước của giày da trước và sau khi sử dụng dầu ăn</figcaption>
                    <p><strong>Đối với giày da trắng:</strong> Hãy dùng giấm lau qua trước, sau đó dùng khăn vải khô lau sạch rồi mới đánh xi trắng. Như thế sẽ hiệu quả hơn khi đánh xi trực tiếp.</p>
                    <p><strong>Đối với giày da đen:</strong> Sau khi bạn đi một thời gian màu sẽ phai dần, thậm chí bị nứt. Hãy dùng mực tàu nhúng vào một ít lòng trắng trứng rồi đánh lên bề mặt da nhiều lần. Sau đó đem giày ra phơi chỗ khô thoáng và đánh xi lên.</p>
                    <p>Đối với giày da mới mua về sẽ hay bị cứng làm bạn bị đau phần gót chân. Hãy dùng một miếng mút thấm chút nước rồi thấm lên bề mặt da, giày sẽ mềm hơn. Lưu ý: không nên làm thường xuyên tránh nhanh hỏng giày nhé.</p>
                    <p>Giày da sau khi sử dụng lâu sẽ có xu hướng cứng lại: sử dụng một nửa củ khoai tây chà lên bề mặt hoặc phết lên giày một ít sữa tươi pha với nước chanh tươi. Sau đó đánh xi lại giày, phần da cứng sẽ mềm hơn.</p>
                    <p><strong>Xem thêm:</strong> Bảo vệ giày dép bằng <a href="#!">bọc giày đi mưa</a> cho ngày mưa dễ dàng</p>
                     <img src="https://file.hstatic.net/1000069970/file/bao-quan-giay-da-lon_8b64908b470744379f908f62f7a8bceb_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <p><strong>Giày da bóng</strong></p>
                    <p>Trước hết bạn hãy làm sạch các vết dơ bên ngoài bằng vải ẩm hay pha thêm một ít xà bông nếu cần. Bên cạnh đó, bạn cũng có thể sử dụng lượng nhỏ dầu khoáng, acetone (nước rửa móng) hay kem đánh răng cho lên một miếng vải sạch và chà nhẹ nhàng lên bề mặt giày cho đến khi vết dơ hoàn toàn biết mất rồi dùng một miếng vải sạch khác để đánh bóng giày.</p>
                    <p><strong>Giày da lộn</strong></p>
                    <p>Nếu giày bị ướt, thấm nước mưa bạn nên rút miếng lót giày ra và phơi khô , sau đó dùng vải ướt lau khô mặt giày. Sử dụng giấy báo đã vò lại và để vào trong giày, lớp giấy sẽ nhanh chóng thấm hút nhanh. Ngoài ra hãy để giày ở nơi thoáng và có ánh sáng nhưng không nên phơi trực tiếp ngoài ánh mặt trời.</p>
                    <p>Nếu giày dính bùn, nên chờ cho đến khi khô bùn rồi bạn dùng bàn chải mềm để loại bỏ nhẹ nhàng các lớp bùn khô còn bám lại trên giày da lộn. Khi chải bạn nên đi theo một hướng nhất định.</p>
                    <p>Nếu giày bị ẩm: Đặt túi đựng viên chống ẩm vào trong giày, sau đó bỏ một chút vôi bột, phấn rôm  rắc đều xung quanh cả trong lẫn ngoài giày vừa có tác dụng khử mùi hôi giày vừa có tác dụng hút ẩm một cách nhanh chóng.</p>
                    <img src="https://file.hstatic.net/1000069970/file/cham-soc-bao-quan-giay-da-lon_9b3f18186c82447494f1395306a37645_grande.jpg" 
                    style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                    <figcaption>Bảo quản giày da lộn</figcaption>
                    <h2>Những lưu ý khi chăm sóc và vệ sinh giày da</h2>
                    <ul>
                        <li>Tránh xa những nơi ẩm mốc và chật chội</li>
                        <li>Giữ da tránh ánh nắng trực tiếp: Bạn cũng nên lưu ý rằng khi giày bị ướt hãy để cho nó khô tự nhiên</li>
                        <li>Thường xuyên vệ sinh giày và làm sạch bằng khăn ẩm</li>
                        <li>Hạn chế tiếp xúc với nước, bởi nước dễ làm hỏng và nứt da giày</li>
                        <li>Nên tháo dây giày trước khi vệ sinh</li>
                    </ul>
                    <p>Bạn biết không, 1 đôi giày da đẹp sẽ giúp tạo phong cách và tăng sự sành điệu cho bất kỳ ai sở hữu chúng. Hãy sở hữu những đôi giày da tuyệt đẹp này trong tủ đồ của bạn nhằm tạo ra phong cách riêng biệt cho bản thân nhé!</p>
                    <p>Trên đây là các cách bảo quản giày da an toàn và hiệu quả mà Vài Thứ Hay muốn chia sẻ đến bạn. Hy vọng qua bài viết này bạn sẽ tìm được cách bảo quản giày da tốt nhất cho mình. Hãy theo dõi <a href="#!"></a> để xem thêm các mẹo hữu ích khác nhé!</p>

                    `,
    },
  ];
  return (
    <>
      <News
        title="Mách bạn cách bảo quản giày da an toàn và hiệu quả"
        articles={articles}
      />
    </>
  );
}

export default LeatherCareTips;
