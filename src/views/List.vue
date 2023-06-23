<template>
  <v-overlay v-model ="isLoading" contained class="align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  <div class="data-container">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Thời gian tạo
          </th>
          <th class="text-left">
            Thuyền trưởng
          </th>
          <th class="text-left">
            Số đăng ký
          </th>
          <th class="text-left">
            Loại Phương Tiện
          </th>
          <th class="text-left">
            Bến rời
          </th>
          <th class="text-left">
            Bến đến
          </th>
          <th class="text-left">
            Thời gian xuất phát
          </th>
          <th class="text-left">
            Trạng thái
          </th>
          <th class="text-left">
            Hello
          </th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listBussinessData"
          :key="item.name + index"
          @click="gotoDetail(item.id)"
          style="cursor:pointer"
        >
          <td>{{ item.created_at }}</td>
          <td>{{ item.captain }}</td>
          <td><div v-html="item.vehicle['registration-number'] ?? ''"/></td>
          <td><div v-html="item.vehicle['type'] ?? ''"/></td>
          <td>{{ item.toStation }}</td>
          <td>{{ item.fromStation }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.type }}</td>
          <td>
            <v-btn @click.stop="onGenPDF(item.id)">Preview</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { addVehicle, getBussinessData, getFormData, getVehicle } from '@/firebase'
import { getEventListeners } from 'events';
import { usePDF } from 'vue3-pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake';

export default {
  data () {
    return {
      listBussinessData: [],
      vehicles: [],
      contentPDF: {},
      isLoading: true
    }
  },
  created(): void {
    this.getBussinessData()
  },

  methods: {
    onChangeContentPDF(newVal) {
      this.contentPDF = newVal
    },
    async onGenPDF(formId: string): Promise<void>  {
      const businessData = await getFormData(formId);
      const employees = businessData['clients'].filter((item) => item.type === 'employee') ;
      const guides = businessData['clients'].filter((item) => item.type === 'guide')
      const customers = businessData['clients'].filter((item) => item.type === 'Customer')
      const test2 = customers.map((item, index) => [
        { text: `${index + 1}`, style: 'static' },
        { text: `${item.name ?? ''}`, style: 'static' },
        { text: `${item.birthYear ?? ''}`, style: 'static' },
        { text: `${item.gender ?? ''}`, style: 'static' },
        { text: `${item.cardId ?? ''}`, style: 'static' },
        { text: `${item.nation ?? ''}`, style: 'static' },
        { text: `${item.place ?? ''}`, style: 'static' },
        { text: `${item.note ?? ''}`, style: 'static' },
      ])
      const docDefinition = {
        content: [
          { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', style: 'header', bold: true, alignment: 'center' },
          { text: 'Độc lập - Tự do - Hạnh phúc', style: 'underlineStyle', bold: true, alignment: 'center' },
          { text: 'DANH SÁCH ', style: 'title', bold: true, alignment: 'center', margin: [12,12,12,0] },
          { text: 'HÀNH KHÁCH VẬN TẢI ĐƯỜNG THỦY NỘI ĐỊA', style: 'title', bold: true, alignment: 'center'},
          {
            columns: [
            {
              width: '35%',
              text: ' - Tên phương tiện: ',
              bold: false,
            },
            {
              width: '35%',
              text: businessData['meanName'],
              bold: true
            },
            {
              width: '30%',
              text: `Số đăng ký : ${businessData['meanNumber']} `, 
            }
            ],
            columnGap: 5,
            margin: 12,
            alignment: 'left'
          },
          {
            columns: [
            {
              width: '35%',
              text: ' - Tên thuyền trưởng:',
              bold: false,
            },
            {
              width: '35%',
              text: businessData['captain'],
              bold: true
            },
            {
              width: '30%',
              text: ''
            }
            ],
            columnGap: 5,
            margin: [8,0],
            alignment: 'left'
          },
          {
            columns: [
            {
              width: '35%',
              text: ' - Tên chủ tàu:',
              bold: false,
            },
            {
              width: '35%',
              text: businessData['ownerName'],
              bold: true
            },
            {
              width: '30%',
              text: ''
            }
            ],
            columnGap: 5,
            margin: 8,
            alignment: 'left'
          },
          {
            text: ` - Trọng tải đăng ký: ${businessData['tonnage'] ?? 0} (tấn) ${businessData['seats'] ?? 0} (ghế)`,
            margin: 8,
            bold: false,
          },
          {
            text: ` - Số lượng thuyền viên:  ${businessData['totalShipMember'] ?? 0} (Người)`,
            margin: 8,
            bold: false,
          },
          {
            text: ` - Số hành khách: 24 (Người) ${businessData['client']?.length ?? 0}`,
            margin: 8,
            bold: false,
          },
          {
          columns: [
            {
              text: ` - Quốc tịch: Việt Nam: ${businessData['localCustomerNumber'] ?? 0} (Người)`,
              bold: false,
            },
            {
              text: `, Nước ngoài: ${businessData['internationalCustomerNumber'] ?? 0} (Người)`,
              bold: false
            },
            ],
            columnGap: 1,
            margin: 8,
            alignment: 'left'
          },
          {
          columns: [
            {
              text: ` - Bến rời ${businessData['fromStation'] ?? ''}`,
              bold: false,
            },
            {
              text: ` Bến đến ${businessData['toStation'] ?? ''}`,
              bold: false
              },
            {
              text: ` Thời gian rời bến ${businessData['time'] ?? ''}`,
              bold: false
            },
            ],
            columnGap: 1,
            margin: 8,
            alignment: 'left'
          },
          {
          columns: [
            ' - Hướng dẫn viên: ',
              {
                stack: guides?.map((item, index) =>  [`${index + 1}. ${item.name}`])
              }
            ],
          margin: 8,
          },
          {
          columns: [
            ' - Nhân viên phục vụ: ',
            {
                stack: employees?.map((item, index) =>  [`${index + 1}. ${item.name}`])
              }
            ],
          margin: 8,
          },
          {
            style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto',  'auto',  100,  'auto', 'auto'],

            body: [
              [
                { text: 'STT', style: 'tableHeader', bold: true },
                { text: 'Họ và tên khách', style: 'tableHeader', bold: true },
                { text: 'Năm sinh', style: 'tableHeader', bold: true },
                { text: 'Gioi tinh', style: 'tableHeader', bold: true },
                { text: 'Số CMND (Số hộ chiếu)', style: 'tableHeader', bold: true },
                { text: 'Quốc tịch', style: 'tableHeader', bold: true },
                { text: 'Nơi tạm trú (đối với khách nước ngoài)', style: 'tableHeader', bold: true },
                { text: 'Ghi chú', style: 'tableHeader', bold: true }
              ],
            ].concat(test2),

          }
          },
          {
            text: '(Thuyền trưởng phải lập và nộp danh sách cho Bộ đội Biên phòng, Ban quản lý bến trước khi phương tiện xuất bến)',
            margin: 2, 
            alignment: 'center',
            fontSize: 8
          },
          {
          columns: [
            {
              stack: [
                { text: ' ĐẠI DIỆN BQL CẢNG, BẾN', style: 'mark', bold: true },
                {text: '(Ký, ghi rõ họ tên)'}
              ]
            },
              {
                stack: [
                  { text: 'Khánh Hòa, ngày  tháng  năm ', italics: true, style: 'static' },
                  { text: ' NGƯỜI LẬP DANH SÁCH', style: 'mark', bold: true },
                  { text: '(Ký, ghi rõ họ tên)' },
                ]
              }
            ],
            margin: 20,
          columnGap: 5,
          },
        ],
        styles: {
          underlineStyle: {
            decoration: 'underline',
            fontSize: 10
          },
          static: {
            fontSize: 10
          },
          mark: {
            fontSize: 12,
          },
          title: {
            fontSize: 14,
          },
          tableExample: {
            pageBreak: 'before',
            noWrap: false,
            margin: 3
          },
          tableHeader: {
            fontSize: 10
          },
        },
      }
      pdfMake.createPdf(docDefinition, null, null, pdfFonts.pdfMake.vfs).open();
    },
    async getBussinessData() {
      const getDatas = await getBussinessData();
      const forms = []
      const idVehicles = []
      for (const form of getDatas) {
        let vehicle: any = {}
        if (!idVehicles.includes(form['idVehicle'])) {
          idVehicles.push(form['idVehicle'])
          const getDataVehicle = await getVehicle(form['idVehicle']);
          vehicle = {...getDataVehicle, idVehicle: form['idVehicle']}
          this.vehicles.push(vehicle)
        } else {
          vehicle = this.vehicles.find(vehicle => vehicle['idVehicle'] === form['idVehicle'])
        }
        forms.push({...form, vehicle});
      }
      this.listBussinessData = forms;
      this.isLoading = false
    },
    gotoDetail(id) {
      this.$router.push('form/'+id)
    }
  }
}
</script>
<style scoped>
.data-container {
  margin: 2rem;
padding: 40px 56px;
}
</style>
